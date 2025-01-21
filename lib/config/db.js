import mongoose from "mongoose";

const ConnectDB = async () => { 
    await mongoose.connect('mongodb+srv://vasanthbanoth:vasanthbanoth@cluster0.bv2hg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

console.log('DB Connected');


}

export default ConnectDB;
