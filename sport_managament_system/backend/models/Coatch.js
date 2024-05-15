import mongoose from "mongoose";

const CoatchSchema = new mongoose.Schema({

    gametype: { type: String },
    name: { type: String },
    gender: { type: String },
    dob: { type: String },
    email: { type: String },
    mobile: { type: String },
    photo: { type: String},

}

)

export default mongoose.model('Coatch', CoatchSchema);