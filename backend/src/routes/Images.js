// Images.js
import { Router } from 'express';
import User from '../models/User.js'; // Import the User model
import cloudinary from '../config/cloudinaryConfig.js';
import upload from '../middlewares/multer.js';

const router = Router();

// Configure Multer to handle file uploads
// const upload = multer();

router.post('/:username/upload-image', upload.single('image'), async (req, res) => {
    try {
        const username = req.params.username;
        const result = await cloudinary.uploader.upload(req.file.path);
        const imageUrl = result.secure_url;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Store the image URL in the user's images array
        user.images.push({ url: imageUrl });

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

        // Ensure that user.images is defined and not empty
        if (!user.images || user.images.length === 0) {
            return res.status(404).json({ message: 'No images found for this user' });
        }

        // Extract image URLs from the user's images array
        const imageUrls = user.images.map(image => image.url);
        res.status(200).json({ images: imageUrls });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});


router.delete('/:username/images/:imageId', async (req, res) => {
    try {
        console.log("Hello from delete Image server End point");
        const username = req.params.username;
        const imageId = req.params.imageId;

        // console.log(imageId);

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
        }

        // console.log("image length: ", user.images.length);
        // console.log("Delete Image Index: ", imageId);

        if (imageId === -1 ) {
            return res.status(404).json({ message: 'Image not Found' });
        }

        user.images.splice(imageId, 1);

        console.log(imageId);
        await user.save();

        res.status(200).json({ message: 'Image deleted Successfully' });

    } catch (error) {
        console.error(error); // Fixed error variable name

        res.status(500).json({ message: 'Server Error' });
    }
});




export { router };
