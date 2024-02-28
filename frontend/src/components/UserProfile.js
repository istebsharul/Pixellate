// UserProfile.js
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const UserProfile = () => {
    const { user } = useContext(UserContext);
    const [selectedImage, setSelectedImage] = useState(null);
    const [images, setImages] = useState([]);

    const handleFileChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const handleUpload = () => {
        if (!selectedImage) {
            alert('Please select an image to upload');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedImage);

        axios.post(`http://localhost:8000/api/user/${user.name}/upload-image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                console.log('Image uploaded successfully:', response.data);
                // Optionally, you can update the user context or display a success message
            })
            .catch(error => {
                console.error('Error uploading image:', error);
                // Optionally, you can display an error message to the user
            });
    };

    const handleDelete = async (imageId) => {
        try {
            await axios.delete(`http://localhost:8000/api/user/${user.name}/images/${imageId}`);
        } catch (error) {
            console.error('Error deleting image: ', error);
        }
    };


    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:8000/api/user/${user.name}/images`)
                .then(response => {
                    setImages(response.data.images);

                    console.log(response.data.images)
                })
                .catch(error => {
                    console.error('Error fetching images:', error);
                });
        }
    }, [user]);


    return (
        <div>
            <h1 className='text-center'>Welcome to the User Profile Page</h1>
            {user && (
                <div className="max-w-screen-lg mx-auto p-4">
                    <p className="mb-4">Username: {user.name}</p>
                    {/* Other user profile information can be displayed here */}
                    <div className="mb-4">
                        <input
                            type="file"
                            className="border border-gray-300 rounded p-2"
                            onChange={handleFileChange}
                        />
                        <button
                            className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleUpload}
                        >
                            Upload Image
                        </button>
                    </div>

                    {images.length > 0 && (
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Your Images</h2>
                            <div className="flex flex-wrap -mx-2">
                                {images.map((imageUrl, index) => (
                                    // <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
                                    //     <div className="relative overflow-hidden rounded-lg" style={{ height: "250px" }}>
                                    //         <img
                                    //             className="absolute inset-0 w-full h-full object-cover"
                                    //             src={imageUrl}
                                    //             alt="Hello"
                                    //         />
                                    //         <button onClick={() => (index)}>Delete</button>
                                    //     </div>
                                    // </div>
                                    <div key={index} className="relative mr-10 mb-10">
                                        <img src={imageUrl} alt="" className="w-48 h-48" />
                                        <button
                                            onClick={() => handleDelete(index)}
                                            className="absolute bottom-2 right-2 z-10 px-2 py-1 bg-gray-800 text-white rounded"
                                        >
                                            Delete
                                        </button>
                                    </div>

                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserProfile;
