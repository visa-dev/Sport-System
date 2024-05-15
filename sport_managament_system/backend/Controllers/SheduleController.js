import Shedule from '../models/Shedule.js';


export const showShedule = async (req, res) => {

    try {
        const allShedule = await Shedule.find();
        res.status(200).json(allShedule);

    } catch (error) {
        res.status(400).json({ success: false, message: 'Shedule Create No' });
    }
}

export const showSheduleByGameType = async (req, res) => {

    const game = req.params.type;
   

    try {


        const allShedule = await Shedule.find({ gameType: game });
        res.status(200).json(allShedule);

    } catch (error) {
        res.status(400).json({ success: false, message: 'Shedule Create No' });
    }

}




export const addShedule = async (req, res) => {

    const { eventName, date, time, venue, gameType } = req.body;

    try {
        const newShedule = new Shedule({
            eventName,
            date,
            time,
            venue,
            gameType
        });

        await newShedule.save();

        res.status(200).json({ success: true, message: 'Shedule Create Ok' });

    } catch (error) {
        res.status(400).json({ success: false, message: `Shedule Create No ${error}` });

    }
}

export const deleteShedule = async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await Shedule.findByIdAndDelete(id);
        if (deleted) {
            res.status(200).json({ message: `Delete Ok` });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: 'Shedule Delete No' });
    }
}

export const updateShedule = async (req, res) => {

    const id = req.params.id;
    const updateData = req.body;
 
    try {
        const deleted = await Shedule.findByIdAndUpdate(id, updateData, { new: true });
        if (deleted) {
            res.status(200).json({ message: `Delete Ok` });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: 'Shedule Delete No' });
    }
}
