import Equipment from '../models/Equipment.js';
import EquipmentsBook from '../models/EquipmentsBook.js';


export const showEquipment = async (req, res) => {

    try {
        const allEquipment = await Equipment.find();
        res.status(200).json(allEquipment);

    } catch (error) {
        res.status(400).json({ success: false, message: 'Equipment Create No' });
    }
}

export const addEquipment = async (req, res) => {
    //console.log(req.body);
    const { gametype, name, qty, available } = req.body;

    try {
        const newEquipment = new Equipment({
            name,
            gametype,
            qty,
            available



        });

        await newEquipment.save();

        res.status(200).json({ success: true, message: 'Equipment Create Ok' });

    } catch (error) {
        res.status(400).json({ success: false, message: `Equipment Create No ${error}` });

    }
}

export const deleteEquipment = async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await Equipment.findByIdAndDelete(id);
        if (deleted) {
            res.status(200).json({ message: `Delete Ok` });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: 'Equipment Delete No' });
    }
}

export const updateEquipment = async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;
    try {
        const deleted = await Equipment.findByIdAndUpdate(id, updateData, { new: true });
        if (deleted) {
            res.status(200).json({ message: `Delete Ok` });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: 'Equipment Delete No' });
    }
}


export const equipmentBook = async (req, res) => {

    const { name, indexnumber, mobile, qty, from, to, status, gametype } = req.body;

    try {

        const newEquipmentBook = new EquipmentsBook({
            name,
            indexnumber,
            mobile,
            qty,
            from,
            to,
            status,
            gametype

        });

        await newEquipmentBook.save();

        res.status(200).json({ success: true, message: 'Equipment Booked Ok' });

    } catch (error) {
        res.status(400).json({ success: false, message: `Equipment Booked No ${error}` });

    }
}

export const showEquipmentsBook = async (req, res) => {

    try {
        const allEquipmentBook = await EquipmentsBook.find();
        res.status(200).json(allEquipmentBook);

    } catch (error) {
        res.status(400).json({ success: false, message: 'Equipment Book No' });
    }
}

export const updateEquipmentBookStatus = async (req, res) => {
    const { id, action, qty, name } = req.params;
  
    const allow = { status: "Outside" };
    const notAllow = { status: "Inside" };
    
    const temp = await Equipment.find({ name: name });
    const temp2 = await EquipmentsBook.findById(id);
    
    

    try {


        if (action === "allow" && (temp2.status === "Inside" || temp2.status === "Pending") && !temp[0].updatedout) {

            const updatedVal = parseInt(temp[0].available) - parseInt(qty);

            await EquipmentsBook.findByIdAndUpdate(id, allow, { new: true });
            await Equipment.updateOne(
                { name: name }, // filter
                { $set: { available: updatedVal, updatedout: true, updatedin: false } }, // update
            );

           

        } else if (action === "not-allow" && (temp2.status === "Outside") && !temp[0].updatedin) {
            const updatedVal = parseInt(temp[0].available) + parseInt(qty);
            await Equipment.updateOne(
                { name: name }, // filter
                { $set: { available: updatedVal, updatedin: true, updatedout: false } }, // update
            );
            await EquipmentsBook.findByIdAndUpdate(id, notAllow, { new: true });
            // await Equipment.findByIdAndUpdate(temp[0]._id, { $inc: { available: +updatedVal } }, { new: true });
          
        }




    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: 'Equipment Update No' });
    }
}



export const deleteEquipmentInventory = async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await EquipmentsBook.findByIdAndDelete(id);
        if (deleted) {
            res.status(200).json({ message: `Delete Ok` });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: 'Equipment Inventory Delete No' });
    }
}
