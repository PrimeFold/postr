import mongoose from 'mongoose'


const dbconnect =async()=>{
    try {
        const con = await mongoose.connect(process.env.MONGO_URL as string);
        console.log(`MongoDB connected ${con.connection.host}`)
    } catch (error) {
        console.error(`Error: ${(error as Error).message}`)
        process.exit(1)
    }
    
}

export default dbconnect;