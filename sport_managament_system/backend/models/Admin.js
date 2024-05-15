import mongoose from "mongoose";


const AddminSchema = new mongoose.Schema({

    firstName: String,
    lastName: String,
    userName: String,
    password: String,
    email: String,
    mobile: Number
}

)

export default mongoose.model('Addmin', AddminSchema);