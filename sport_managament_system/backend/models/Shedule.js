import mongoose from "mongoose";

const SheduleSchema = new mongoose.Schema({

    eventName: { type: String },
    date: { type: String},
    time: { type: String },
    venue: { type: String },
    gameType: { type: String },

}

)

export default mongoose.model('Shedule', SheduleSchema);