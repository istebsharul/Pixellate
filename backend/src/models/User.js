
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    images: [{ data: Buffer, contentType: String }],
});

const User = mongoose.model('User', UserSchema);

export default User