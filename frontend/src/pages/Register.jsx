import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/api'; // Функція для реєстрації користувача

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState(null);
    const navigate = useNavigate();

    // Обробник зміни аватару
    const handleAvatarChange = (e) => {
        setAvatar(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        if (avatar) {
            formData.append('avatar', avatar); // Додаємо аватар, якщо він є
        }

        try {
            const { data } = await registerUser(formData); // Виклик API для реєстрації користувача
            localStorage.setItem('token', data.token); // Збереження токена
            localStorage.setItem('avatar', data.user.avatar); // Збереження аватара користувача
            alert('Registration successful!');
            navigate('/'); // Перенаправлення після реєстрації на головну сторінку
        } catch (error) {
            console.error('Registration error:', error);
            alert('Error during registration!');
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                    <label>Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Avatar:</label>
                    <input
                        type="file"
                        className="form-control"
                        onChange={handleAvatarChange}
                        accept="image/*"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

export default Register;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { registerUser } from '../api/api';

// const Register = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [avatar, setAvatar] = useState(null);
//     const navigate = useNavigate();

//     const handleAvatarChange = (e) => {
//         setAvatar(e.target.files[0]);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append('name', name);
//         formData.append('email', email);
//         formData.append('password', password);
//         if (avatar) {
//             formData.append('avatar', avatar);
//         }

//         try {
//             const { data } = await registerUser(formData);
//             localStorage.setItem('token', data.token);
//             localStorage.setItem('avatar', data.user.avatar);
//             alert('Registration successful!');
//             navigate('/');
//         } catch (error) {
//             console.error(error);
//             alert('Error during registration!');
//         }
//     };

//     return (
//         <div className="container">
//             <h2>Register</h2>
//             <form onSubmit={handleSubmit} encType="multipart/form-data">
//                 <div className="mb-3">
//                     <label>Name:</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label>Email:</label>
//                     <input
//                         type="email"
//                         className="form-control"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label>Password:</label>
//                     <input
//                         type="password"
//                         className="form-control"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label>Avatar:</label>
//                     <input
//                         type="file"
//                         className="form-control"
//                         onChange={handleAvatarChange}
//                         accept="image/*"
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-primary">Register</button>
//             </form>
//         </div>
//     );
// };

// export default Register;
