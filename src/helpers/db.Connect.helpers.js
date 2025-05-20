import { connect } from "mongoose";

const dbConnect = async (link) => {
    try {
        await connect(link);
        console.log("Conectado a MongoDB");
    } catch(error) {
        console.log(error);
    }
};

export default dbConnect;