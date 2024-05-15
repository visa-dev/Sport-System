import express, { json } from 'express';
import cookieParser from 'cookie-parser';

import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import fileUpload from 'express-fileupload';

// import authRoute from './Routes/authRoute.js';
import coatchRoutes from './Routes/CoatchRoutes.js';
import equipmentRoutes from './Routes/EquipmentRoutes.js';
import sheduleRoutes from './Routes/SheduleRoutes.js';
import sportRoutes from './Routes/SportRoutes.js';
import achivementRoutes from './Routes/AchivementRoutes.js';
import ScoreRoutes from './Routes/ScoreCardRoutes.js';
import AuthRoutes from './Routes/AuthRoutes.js';

const app = express();



dotenv.config();

app.use("/public", express.static("public"));
const port = process.env.PORT || 8080;

app.use(cors({
    origin: true,
    credentials: true,
}));


app.use(cookieParser());
// enable file upload
app.use(fileUpload());

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // specil if missed this one req.body is empty

app.use(express.json());


// const verifyAdmin = (req, res, next) => {
//     const token = req.cookies.token;
//     console.log(token);
//     if (!token) {
//         return console.log("Token not availble");
//     } else {
//         jwt.verify(token, process.env.HASH_SECRET, (err, decoded) => {
//             if (err) {
//                 return console.log("Token Not Match");

//             } else {
//                 next();
//             }
//         });
//     }



// }

app.use('/admin', AuthRoutes);

app.use('/api/coatch', coatchRoutes);
app.use('/api/shedule', sheduleRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/sport', sportRoutes);
app.use('/api/achivement', achivementRoutes);
app.use('/api/score', ScoreRoutes);





//mongoose.set('stricQuery', false);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        });
        console.log("Connected");
    } catch (error) {
       
        console.log(error.message);
    }
}

//middlewares




//route




app.listen(port, () => {
    connectDB();
    console.log(`App running on ${port}`);
});   