import ScoreCard from '../models/ScoreCard.js';

export const showScoreCard = async (req, res) => {

    try {
        const allScoreCard = await ScoreCard.find();
        res.status(200).json(allScoreCard);

    } catch (error) {
        res.status(400).json({ success: false, message: 'ScoreCard Create No' });
    }
}


export const showScoreCardById = async (req, res) => {
    const id = req.params.id;
    try {
        const allScoreCard = await ScoreCard.findById(id);

        res.status(200).json(allScoreCard);


    } catch (error) {
        res.status(400).json({ success: false, message: 'ScoreCard Create No' });
    }
}

export const addScoreCard = async (req, res) => {

    const { team1Name, team2Name, team1Score, team2Score, wiket, over, eventName, gameType, date, _id, wicketFalling } = req.body;

    try {
        const newScoreCard = new ScoreCard({
            team1Name,
            team2Name,
            team1Score,
            team2Score,
            wiket,
            over,
            wicketFalling,
            eventName,
            gameType,
            date,
            _id



        });

        await newScoreCard.save();

        res.status(200).json({ success: true, message: 'ScoreCard Create Ok' });

    } catch (error) {
        res.status(400).json({ success: false, message: `ScoreCard Create No ${error}` });

    }
}


export const deleteScoreCard = async (req, res) => {
    const id = req.params.id;

    try {
        const deleted = await ScoreCard.findByIdAndDelete(id);
        if (deleted) {
            res.status(200).json({ message: `Delete Ok` });

        }
    } catch (error) {
        res.status(400).json({ success: false, message: 'ScoreCard Delete No' });
    }
}

export const updateScoreCard = async (req, res) => {
    const id = req.params.id;
    const score1 = req.body.team1Score;
    const score2 = req.body.team2Score;
    const wicket = req.body.wicket;
    const over = req.body.over;

    // const wicketFalling = { 'wicket': wicket, 'over': over };
    // const prevWicket = await ScoreCard.findById(id);
    // let wicketArray=null;
    // if (prevWicket !== null) {
    //     wicketArray = prevWicket.wicketFalling.concat(wicketFalling);
    //    // console.log(prevWicket.wicketFalling);
    // } else {
    //     wicketArray = wicketFalling;
    // }
    


    const updateData = { 'team1Score': score1, 'team2Score': score2, 'wicket': wicket, 'over': over};

    try {
        const updated = await ScoreCard.findByIdAndUpdate(id, updateData, { new: true });
        if (updated) {
          // console.log(updated);
            res.status(200).json({ message: `Update Ok` });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: 'ScoreCard Delete No' });
    }
}

export const updateTeamName = async (req, res) => {
    const id = req.params.id;
    const team1Name = req.body.team1Name;
    const team2Name = req.body.team2Name;
    const updateData = { 'team1Name': team1Name, 'team2Name': team2Name };

    try {
        const updated = await ScoreCard.findByIdAndUpdate(id, updateData, { new: true });
        if (updated) {

            res.status(200).json({ message: `Update Ok` });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: 'ScoreCard Delete No' });
    }
}
