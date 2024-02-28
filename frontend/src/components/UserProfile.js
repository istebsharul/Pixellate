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

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:8000/api/user/${user.name}/images`)
                .then(response => {
                    setImages(response.data.images);
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
                <div>
                    <p>Username: {user.name}</p>
                    {/* Other user profile information can be displayed here */}
                    <input type="file" onChange={handleFileChange} />
                    <button onClick={handleUpload}>Upload Image</button>

                    {images.length > 0 && (
                        <div>
                            <h2>Your Images</h2>
                            <div>
                                {images.map((image, index) => {
                                    return <img key={index} src={`data:${image.contentType};base64,${image.data}`} alt={`Image`} />
                                })}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserProfile;
