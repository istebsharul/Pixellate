import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import ImageModal from './Modal/ImageModal';

function MyImages() {
    const [images, setImages] = useState([]);
    const { user } = useContext(UserContext);

    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    const openModal = (index) => {
        setSelectedImageIndex(index);
    };

    const closeModal = () => {
        setSelectedImageIndex(null);
    };

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/user/${user.name}/images`);
                setImages(response.data.images);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, [user.name, setImages]); // Include fetchImages in the dependency array


    return (
        <div>
            <div className="max-w-screen-lg mx-auto p-4">
                <h2 className="text-lg font-semibold mb-2">My Gallery</h2>
                <div className="w-full flex flex-wrap mx-2">
                    {images.map((imageUrl, index) => (
                        <div key={index} className="mr-1 mb-5">
                            <img
                                src={imageUrl}
                                alt=""
                                className="rounded-lg w-48 h-48 object-cover cursor-pointer"
                                onClick={() => openModal(index)}
                            />
                        </div>
                    ))}
                </div>
            </div>
            {selectedImageIndex !== null && (
                <ImageModal imageUrl={images[selectedImageIndex]} onClose={closeModal} />
            )}
        </div>
    );
}

export default MyImages