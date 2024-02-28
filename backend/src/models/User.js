import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    images: [{ url: String }], // Modify to store image URLs
});

const User = mongoose.model('User', UserSchema);

export default User;
