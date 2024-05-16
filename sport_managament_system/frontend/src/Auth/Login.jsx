import { useState, CSSProperties } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import HashLoader from "react-spinners/HashLoader";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


const overrideStyle = {
    display: "block",
    margin: "0 auto",
    marginTop: '200px',
    borderColor: "red",
};


const Login = () => {

    const navigate = useNavigate();
    const [loged, setLoged] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        rememberMe: false,
    });


    const [errors, setErrors] = useState({
        username: '',
        password: '',
    });

    const validateForm = () => {
        let valid = true;
        const newErrors = { username: '', password: '' };

        if (!formData.username) {
            newErrors.username = 'Username is required';
            valid = false;
        }

        // Password strength check
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!formData.password || !passwordRegex.test(formData.password)) {
            newErrors.password = 'Password must be at least 6 characters with at least one uppercase and one lowercase letter';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    axios.defaults.withCredentials = true;
    const handleSubmit = async (e) => {

        e.preventDefault();
        if (validateForm()) {
            // Add your login logic here
            const username = formData.username;
            const password = formData.password;
            await axios.post('http://localhost:5000/admin/login', { username, password })
                .then(async (res) => {
                    // console.log(res.data)
                    if (res.data === 'Ok') {
                        setLoged(true);
                        await new Promise(resolve => setTimeout(resolve, 2500));

                        navigate('../admin/home');
                    } else if (res.data === "Fail") {
                        alert("Password Incorrect..!");
                    } else {
                        alert("User name not found..!");
                    }

                })
                .catch(error => {
                    // Handle errors
                    console.error('Error:', error);
                });
        }

    }
    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'rememberMe' ? checked : value,
        });
    };



    return (
        <div>
            {

                loged ? (<HashLoader
                    cssOverride={overrideStyle}
                    color="#4d36d6"

                    size={100}
                    speedMultiplier={1}
                />) : (< Box

                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column', // Align children vertically
                        alignItems: 'center', // Center items horizontally
                        maxWidth: '500px',
                        margin: 'auto',
                        marginTop: '100px',
                        padding: '20px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        backgroundColor: 'white',

                    }
                    }

                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <TextField
                        fullWidth
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        error={Boolean(errors.username)}
                        helperText={errors.username}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        type="password"
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={Boolean(errors.password)}
                        helperText={errors.password}
                        margin="normal"
                        sx={{ mt: 2 }}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={formData.rememberMe} onChange={handleChange} name="rememberMe" color="primary" />}
                        label="Remember Me"
                        sx={{ mt: 1, textAlign: 'left' }}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Login
                    </Button>
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Link href="#" variant="body2">
                            Forgot Password?
                        </Link>
                        <Box mt={1}>
                            <Link href='register' variant="body2">
                                Don't have an account? Sign Up
                            </Link>
                        </Box>
                    </Box>
                </Box >)
            }
        </div>

    )
};

export default Login;



