import Sport from '../models/Sport.js';


export const showSport = async (req, res) => {

    try {
        const allSport = await Sport.find();
        res.status(200).json(allSport);

    } catch (error) {
        res.status(400).json({ success: false, message: 'Sport Create No' });
    }
}

export const addSport = async (req, res) => {

    const { sportName, coatch } = req.body;

    try {
        const newSport = new Sport({
            sportName,
            coatch
        });

        await newSport.save();

        res.status(200).json({ success: true, message: 'Sport Create Ok' });

    } catch (error) {
        res.status(400).json({ success: false, message: `Sport Create No ${error}` });

    }
}

export const deleteSport = async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await Sport.findByIdAndDelete(id);
        if (deleted) {
            res.status(200).json({ message: `Delete Ok` });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: 'Sport Delete No' });
    }
}

export const updateSport = async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;

    try {
        const deleted = await Sport.findByIdAndUpdate(id, updateData, { new: true });
        if (deleted) {
            res.status(200).json({ message: `Delete Ok` });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: 'Sport Delete No' });
    }
}
