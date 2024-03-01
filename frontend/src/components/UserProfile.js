import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { FaTrash } from 'react-icons/fa';

const UserProfile = () => {
    const { user } = useContext(UserContext);
    const [selectedImage, setSelectedImage] = useState(null);
    const [images, setImages] = useState([]);
    const [deleteIndex, setDeleteIndex] = useState(null); // Index of the image to delete
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedImage || !user) {
            alert('Please select an image to upload');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedImage);

        try {
            setLoading(true);
            await axios.post(`http://localhost:8000/api/user/${user.name}/upload-image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Fetch the updated list of images after successful upload
            const response = await axios.get(`http://localhost:8000/api/user/${user.name}/images`);
            setImages(response.data.images);

            setSelectedImage(null); // Reset the selected image state
            setLoading(false);
        } catch (error) {
            console.error('Error uploading image:', error);
            setLoading(false);
        }

        window.location.reload();
    };


    const handleDelete = async (index) => {
        setDeleteIndex(index); // Set the index of the image to delete
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/user/${user.name}/images/${deleteIndex}`);
            setDeleteIndex(null); // Reset the deleteIndex state after successful deletion
            fetchImages(); // Fetch images again after deletion
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    const cancelDelete = () => {
        setDeleteIndex(null); // Reset the deleteIndex state if delete is canceled
    };


    useEffect(() => {
        if (user) {
            fetchImages();
        }
    }, [user]);

    const fetchImages = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/user/${user.name}/images`);
            setImages(response.data.images);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };


    return (
        <div>
            {user && (
                <div className="max-w-screen-lg mx-auto p-4">
                    <p className="mb-4 text-center font-semibold text-xl">Username: {user.name}</p>
                    {/* Other user profile information can be displayed here */}
                    <div className="mx-auto rounded-lg shadow-inner w-max px-4 h-20 flex items-center justify-center mb-4 bg-gray-200">
                        <div>
                            <input
                                type="file"
                                className="w-min-content border-400 flex justify-center items-center border-gray-300 rounded p-2"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div>
                            <button
                                className="ml-0 bg-gray-500 hover:bg-black text-white font-bold py-2 px-4 rounded"
                                onClick={handleUpload}
                            >
                                Upload Image
                            </button>
                        </div>
                    </div>

                    {images.length > 0 && (
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Your Images</h2>
                            <div className="w-full flex flex-wrap mx-2">
                                {images.map((imageUrl, index) => (
                                    <div key={index} className="relative mr-1 mb-10">
                                        <img src={imageUrl} alt="" className="rounded-lg object-cover w-48 h-48" />
                                        <button
                                            onClick={() => handleDelete(index)}
                                            className="absolute bottom-2 right-2 z-1 px-2 py-1 object-cover bg-gray-100 bg-opacity-50 text-black rounded"
                                        >
                                            <FaTrash /> {/* Use the delete icon here */}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Confirm Delete Modal */}
            {deleteIndex !== null && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow-md">
                        <p>Are you sure you want to delete this image?</p>
                        <div className="mt-4 flex justify-between">
                            <button onClick={confirmDelete} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                                Yes, Delete
                            </button>
                            <button onClick={cancelDelete} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;