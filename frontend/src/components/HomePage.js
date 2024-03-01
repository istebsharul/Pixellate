import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import ImageModal from './Modal/ImageModal';


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const Homepage = () => {
    const [randomImages, setRandomImages] = useState([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);


    useEffect(() => {
        const fetchRandomImages = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/user/random-images');
                const shuffledImages = shuffleArray(response.data); // Shuffle the images
                setRandomImages(shuffledImages);
            } catch (error) {
                console.error('Error fetching random images:', error);
            }
        };

        fetchRandomImages();
    }, []);

    const openModal = (index) => {
        setSelectedImageIndex(index);
    };

    const closeModal = () => {
        setSelectedImageIndex(null);
    };


    return (
        <div className="w-full flex flex-col justify-center items-center p-4">
            {/* <h1 className='text-4xl text-center p-20 line-5 leading-normal font-raleway'><span className='text-5xl font-raleway italic'>Unveil the Beauty of Pixels</span><br />Explore, Create, and Connect with Pixellate. </h1> */}
            <h1 className='text-4xl text-center p-20 line-5 leading-normal font-serif'><span className='text-5xl font-sans italic'>Unveil the Beauty of Pixels</span><br />Explore, Create, and Connect with Pixellate. </h1>

        


            <div className="w-2/3% grid grid-cols-4 mx-auto p-4 gap-5">
                {randomImages.map((imageUrl, index) => (
                    <div key={index} className="w-70 h-70 mb-1">
                        <img
                            key={index}
                            src={imageUrl}
                            alt=""
                            className="rounded-md w-60 h-60 cursor-pointer object-cover hover:opacity-50"
                            onClick={() => openModal(index)}
                        />
                    </div>
                ))}
            </div>
            {selectedImageIndex !== null && (
                <ImageModal imageUrl={randomImages[selectedImageIndex]} onClose={closeModal} />
            )}
        </div>
    );
}

export default Homepage