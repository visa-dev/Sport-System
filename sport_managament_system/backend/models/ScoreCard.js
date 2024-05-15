import mongoose from "mongoose";

const ScoreCardSchema = new mongoose.Schema({

    team1Name: String,
    team2Name: String,
    team1Score: Number,
    team2Score: Number,
    wicket: Number,
    over: Number,
    wicketFalling: Array,
    gameType: String,
    date: String,



}

)

export default mongoose.model('ScoreCard', ScoreCardSchema);