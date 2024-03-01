import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import ImageModal from './Modal/ImageModal';
import { Link } from 'react-router-dom';


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
                if (user && user.name) { // Check if user object and its name property exist
                    const response = await axios.get(`http://localhost:8000/api/user/${user.name}/images`);
                    setImages(response.data.images);
                } else {
                    console.log("No user found. Please log in.");
                }
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, [user]); // Only user is needed in the dependency array

    if (!user || !user.name) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div>No user logged in. Please <Link className='rounded-full px-5 py-2 bg-black text-white' to="/login">login</Link>.</div>
            </div>
        );
    }

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

            <div className="w-max mx-auto">
                <Link to="/profile" className="block px-4 py-2 border border-black text-white bg-black hover:bg-white hover:text-black rounded-md shadow-md transition-colors duration-300 ease-in-out">Click Here to Upload More</Link>
            </div>
        </div>
    );
}

export default MyImages;

// import React, { useContext, useState, useEffect } from 'react'
// import { UserContext } from '../context/UserContext';
// import axios from 'axios';
// import ImageModal from './Modal/ImageModal';
// import { Link } from 'react-router-dom';


// function MyImages() {
//     const [images, setImages] = useState([]);
//     const { user } = useContext(UserContext);

//     const [selectedImageIndex, setSelectedImageIndex] = useState(null);

//     const openModal = (index) => {
//         setSelectedImageIndex(index);
//     };

//     const closeModal = () => {
//         setSelectedImageIndex(null);
//     };

//     useEffect(() => {
//         const fetchImages = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8000/api/user/${user.name}/images`);
//                 setImages(response.data.images);
//             } catch (error) {
//                 console.error('Error fetching images:', error);
//             }
//         };

//         fetchImages();
//     }, [user.name, setImages]); // Include fetchImages in the dependency array


//     return (
//         <div>
//             <div className="max-w-screen-lg mx-auto p-4">
//                 <h2 className="text-lg font-semibold mb-2">My Gallery</h2>
//                 <div className="w-full flex flex-wrap mx-2">
//                     {images.map((imageUrl, index) => (
//                         <div key={index} className="mr-1 mb-5">
//                             <img
//                                 src={imageUrl}
//                                 alt=""
//                                 className="rounded-lg w-48 h-48 object-cover cursor-pointer"
//                                 onClick={() => openModal(index)}
//                             />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             {selectedImageIndex !== null && (
//                 <ImageModal imageUrl={images[selectedImageIndex]} onClose={closeModal} />
//             )}

//             <div className="w-max mx-auto">
//                 <Link to="/profile" className="block px-4 py-2 border border-black text-white bg-black hover:bg-white hover:text-black rounded-md shadow-md transition-colors duration-300 ease-in-out">Click Here to Upload More</Link>
//             </div>
//         </div>
//     );
// }

// export default MyImages