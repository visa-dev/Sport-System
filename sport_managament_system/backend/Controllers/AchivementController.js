import Achivement from '../models/Achivement.js';


export const showAchivement = async (req, res) => {

    try {
        const allAchivement = await Achivement.find();
        res.status(200).json(allAchivement);
       //console.log(allAchivement)

    } catch (error) {
        res.status(400).json({ success: false, message: 'Achivement Create No' });
    }
}

export const addAchivement = async (req, res) => {

    const { achivementName, gameType, discription, photo } = req.body;


    try {
        const newAchivement = new Achivement({
            gameType: gameType,
            achivementName: achivementName,
            discription: discription,
            photo: photo


        });

        await newAchivement.save();

        if (req.files != null) {

            const path = `public/${newAchivement._id}.jpg`;
            const file = req.files.photo;
            file.mv(path, (error) => {
                if (error) {
                    return res.status(ec.serverError).json({
                        status: "error",
                        message: "Couldn't save the profile picture.",
                        error: error.message,
                    });
                }
            });
        }

        res.status(200).json({ success: true, message: 'AchivementCreate Ok' });

    } catch (error) {
        res.status(400).json({ success: false, message: `AchivementCreate No ${error}` });

    }
}

export const deleteAchivement = async (req, res) => {

    const id = req.params.id;
    try {
        const deleted = await Achivement.findByIdAndDelete(id);

        if (deleted) {

            res.status(200).json({ message: `Delete Ok` });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: 'AchivementDelete No' });
    }
}

export const updateAchivement = async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;
    try {
        const deleted = await Achivement.findByIdAndUpdate(id, updateData, { new: true });
        if (deleted) {
            res.status(200).json({ message: `Delete Ok` });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: 'AchivementDelete No' });
    }
}
