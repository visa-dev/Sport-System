import mongoose from "mongoose";

const SportSchema = new mongoose.Schema({

    sportName: { type: String },
    coatch: { type: String },

}

)

export default mongoose.model('Sport', SportSchema);