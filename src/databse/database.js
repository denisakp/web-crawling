import mongoose from "mongoose";

mongoose.set('strictQuery', false);

export async function connectToDatabase() {
    console.info('connecting to database......')
    await mongoose.connect('mongodb://127.0.0.1:27017/crawl')
        .then(() => console.info('connected to database'))
        .catch(err => console.error(err))
}
