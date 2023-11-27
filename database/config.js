import mongoose from "mongoose"

export const dbConnection = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@calendar-cluster.lkd3qd0.mongodb.net/${process.env.DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    
    console.log('DB Connected Successfully');

  } catch (error) {
    console.log(error);
    throw new Error('DB connection have failed')
  }
}
