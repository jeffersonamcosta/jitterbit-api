import mongoose from "mongoose";

export async function connect() {
    if (mongoose.connection.readyState === 1) {
        return;
    }

    await mongoose.connect(process.env.MONGODB_URI, {
        dbName: "jitterbit"
    });

    console.log("MongoDB conectado");
}
