import mongoose from "mongoose";

const EquipmentSchema = new mongoose.Schema({

    name: { type: String },
    gametype: { type: String },
    qty: { type: String },
    available: { type: Number },
    updatedout: {
        type: Boolean,
        default: false
    },
    updatedin: {
        type: Boolean,
        default: false
    }

}

)

export default mongoose.model('Equipment', EquipmentSchema);