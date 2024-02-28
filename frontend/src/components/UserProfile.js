import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const UserProfile = () => {
    const { user } = useContext(UserContext);
    const [selectedImage, setSelectedImage] = useState(null);

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

        console.log(user.id);

        axios.post('http://localhost:8000/api/user/upload-image', formData, {
            params: {
                userId: user.id // Assuming user.id contains the userId
            },
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

    return (
        <div>
            <h1 className='text-center'>Welcome to the User Profile Page</h1>
            {user && (
                <div>
                    <p>Username: {user.name}</p>
                    {/* Other user profile information can be displayed here */}
                    <input type="file" onChange={handleFileChange} />
                    <button onClick={handleUpload}>Upload Image</button>
                </div>
            )}
        </div>
    );
};

export default UserProfile;


// import React, { useContext, useState } from 'react';
// import { UserContext } from '../context/UserContext';
// import axios from 'axios';


// const UserProfile = () => {
//     const { user } = useContext(UserContext);
//     // console.log(user.name);

//     const [selectedImage, setSelectedImage] = useState(null);

//     const handleFileChange = (event) => {
//         setSelectedImage(event.target.files[0]);
//     };

//     const handleUpload = () => {
//         if (!selectedImage) {
//             alert('Please select an image to upload');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('image', selectedImage);

//         axios.post('    ', formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data'
//             }
//         })
//             .then(response => {
//                 console.log('Image uploaded successfully:', response.data);
//                 // Optionally, you can update the user context or display a success message
//             })
//             .catch(error => {
//                 console.error('Error uploading image:', error);
//                 // Optionally, you can display an error message to the user
//             });
//     };
//     return (
//         <div>
//             <h1 className='text-center' >Welcome to the User Profile Page</h1>
//             {user && (
//                 <div>
//                     <p>Username: {user.name}</p>
//                     {/* Other user profile information can be displayed here */}
//                 </div>
//             )}
//             <input type="file" onChange={handleFileChange} />
//             <button onClick={handleUpload}>Upload Image</button>
//         </div>
//     );
// };

// export default UserProfile;
