import mongoose from "mongoose";

const EquipmentsBookSchema = new mongoose.Schema({

    name: {
        type: String,

    },
    gametype: {
        type: String
    },
    indexnumber: {
        type: String,

    },
    mobile: {
        type: String,

    },
    qty: {
        type: Number,

    },
    from: {
        type: String,

    },
    to: {
        type: String,

    },
    status: {
        default: "Pending",
        type: String
    }

    ,
    updated: {
        type: Boolean,
        default: false
    }

}

)

export default mongoose.model('EquipmentsBook', EquipmentsBookSchema);