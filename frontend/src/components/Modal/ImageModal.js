import React from 'react';

function ImageModal({ imageUrl, onClose }) {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded-lg">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="w-96 h-96"> {/* Adjust the dimensions as needed */}
                    <img src={imageUrl} alt="" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    );
}

export default ImageModal;