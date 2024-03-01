// controllers/UserController.js
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const UserController = {
    signUp: async (req, res) => {
        try {
            const { username, email, password } = req.body;

            // Check if the user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user
            const newUser = new User({
                username,
                email,
                password: hashedPassword,
            });

            // Save the user to the database
            await newUser.save();

            res.status(201).json({ message: 'User created successfully' });

        } catch (error) {
            console.error('Error in sign up:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Check if password is provided
            if (!password) {
                return res.status(400).json({ message: 'Password is required' });
            }

            // Check if the user exists
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Check if the password is correct
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                jwt.sign({ email: user.email, id: user.id, name: user.username }, process.env.JWT_SECRET, {}, (err, token) => {
                    if (err) {
                        console.error('Error signing JWT:', err);
                        return res.status(500).json({ message: 'Error signing JWT' });
                    }

                    // Set the token in a cookie
                    //   res.cookie('token', token).json(user);

                    console.log('JWT Token', token);
                    // Set the token in a cookie
                    res.cookie('token', token, {
                        httpOnly: false,
                        // make the cookie accessible only by the web server
                        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                        // other cookie options like expiry, domain, path, secure, etc. can also be set here
                    });

                    console.log('Cookie Set', token);
                    // Send the user data and a success message in the response
                    res.status(200).json({ message: 'Login successful', user });
                });
            } else {
                // Send an error response if the password does not match
                res.status(401).json({ error: 'Invalid password' });
            }
        } catch (error) {
            console.error('Error in login:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    profile: (req, res) => {

        // console.log("Hello From Profile");

        const token = req.cookies.token;
        // console.log(token);
        // const token = req.cookies.token; // Retrieve the token cookie

        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
                if (err) {
                    console.error('Error verifying JWT:', err);
                    return res.status(401).json({ message: 'Invalid token' });
                }
                res.json(user);
            });
        } else {
            res.status(401).json({ message: 'No token found' });
        }
    },
    getRandomImages: async (req, res) => {
        try {
            // Fetch random users from the database
            const randomUsers = await User.aggregate([
                { $sample: { size: 10 } }, // Sample 10 random users
                { $project: { images: { $slice: ["$images", 3] } } } // Project the first 3 images for each user
            ]);

            // Extract image URLs from random users
            const randomImages = randomUsers.flatMap(user => user.images.map(image => image.url));

            // randomImages = shuffleArray(randomImages);

            res.status(200).json(randomImages);
        } catch (error) {
            console.error('Error fetching random images:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // getRandomImages: async (req, res) => {
    //     try {
    //         // Fetch random users from the database
    //         const randomUsers = await User.aggregate([{ $sample: { size: 10 } }]);

    //         // console.log(randomUsers);
    //         // Extract image URLs from random users
    //         const randomImages = randomUsers.map(user => user.images[Math.floor(Math.random() * user.images.length)].url);

    //         res.status(200).json(randomImages);
    //     } catch (error) {
    //         console.error('Error fetching random images:', error);
    //         res.status(500).json({ message: 'Internal server error' });
    //     }
    // },
};

export default UserController

