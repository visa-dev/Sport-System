import mongoose from "mongoose";


const AchivementSchema = new mongoose.Schema({

    gameType: { type: String },
    achivementName: { type: String },
    discription: { type: String },
    photo: { type: String },


}

)

export default mongoose.model('Achivement', AchivementSchema);