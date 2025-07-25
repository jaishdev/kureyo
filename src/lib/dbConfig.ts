import mongoose from 'mongoose';

type ConnectionObject = {
    isConnected? : number 
}

const connection : ConnectionObject = {}

async function dbConnect() : Promise<void> {
    if(connection.isConnected){       // OR connection.isConnected === 1 , its similar.
        console.log("Already connected to DB");
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "")
        connection.isConnected = db.connections[0].readyState
        console.log(db)
        console.log("-----------------------------------------------------------------------------------------------------------------------------------------------------")
        console.log(db.connections)
        console.log("successfully connected")
    } catch (error) {
        console.log("DB connection failed" , error)
        process.exit(1)
    }
}
export default dbConnect;