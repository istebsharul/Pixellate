import { Schema, model } from 'mongoose';

const imageSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    image: {
        data: Buffer, // Store image data as Buffer
        contentType: String // Store content type of the image
    }
});

export default model('Image', imageSchema);
