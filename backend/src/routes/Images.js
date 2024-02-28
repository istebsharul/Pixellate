// Images.js
import { Router } from 'express';
import multer from 'multer';
import User from '../models/User.js'; // Import the User model

const router = Router();

// Configure Multer to handle file uploads
const upload = multer();

router.post('/:username/upload-image', upload.single('image'), async (req, res) => {
    try {
        const username = req.params.username; // Get the username from the request parameters

        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const imageBuffer = req.file.buffer; // Get the buffer containing the image data

        // Add the image data to the user's images array
        user.images.push({ data: imageBuffer, contentType: req.file.mimetype });

        // Save the updated user document
        await user.save();

        // Send a success response
        res.status(201).json({ message: 'Image uploaded successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.get('/:username/images', async (req, res) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ images: user.images });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

export { router };
