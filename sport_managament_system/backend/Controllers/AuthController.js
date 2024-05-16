import Admin from '../models/Admin.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';




export const login = async (req, res) => {
    //console.log(req.body);
    try {
        dotenv.config();
        const logedAdmin = await Admin.findOne({ userName: req.body.username });



        if (logedAdmin !== null) {
            if (await bcrypt.compare(req.body.password, logedAdmin.password)) {



                const token = jwt.sign({ id: logedAdmin._id }, process.env.HASH_SECRET, { expiresIn: '1h' });
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true, // Send only over HTTPS
                    sameSite: 'strict',
                });

                res.send('Ok')
            } else {
                res.send('Fail');
            }
        } else {
            res.send('not-found')
        }




    } catch (error) {
        res.status(400).json({ success: false, message: 'Coatch Create No' });
    }
}


export const signup = async (req, res) => {
    //console.log(req.body);
    const { userName, password, email, mobile, firstName, lastName } = req.body;
    const hashed = await bcrypt.hash(password, 10);


    try {
        const newAdmin = new Admin({
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            password: hashed,
            email: email,
            mobile: mobile

        });

        await newAdmin.save();

        // if (req.files != null) {

        //     const path = `public/${newAdmin._id}.jpg`;
        //     const file = req.files.photo;
        //     file.mv(path, (error) => {
        //         if (error) {
        //             return res.status(ec.serverError).json({
        //                 status: "error",
        //                 message: "Couldn't save the profile picture.",
        //                 error: error.message,
        //             });
        //         }
        //     });
        // }


        res.status(200).json({ success: true, message: 'Admin Create Ok' });

    } catch (error) {
        res.status(400).json({ success: false, message: `Admin Create No ${error}` });

    }
}

// export const deleteAdmin = async (req, res) => {
//     const id = req.params.id;
//     try {
//         const deleted = await Admin.findByIdAndDelete(id);
//         if (deleted) {
//             res.status(200).json({ message: `Delete Ok` });
//         }
//     } catch (error) {
//         res.status(400).json({ success: false, message: 'Admin Delete No' });
//     }
// }

// export const updateAdmin = async (req, res) => {
//     const id = req.params.id;
//     const updateData = req.body;
//     try {
//         const deleted = await Admin.findByIdAndUpdate(id, updateData, { new: true });
//         if (deleted) {
//             res.status(200).json({ message: `Delete Ok` });
//         }
//     } catch (error) {
//         res.status(400).json({ success: false, message: 'Admin Delete No' });
//     }
// }
