
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import appointmentRouter from './routes/appointmentRouter.js'
import therapyBookingRouter from './routes/therapyBookingRouter.js'
import doctorRouter from './routes/doctorRouter.js';


const app = express();
const mongoDbUrl = "mongodb+srv://pabodha_db_user:1234@cluster0.efbrbuh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

//Middleware
app.use(bodyParser.json())
app.use(cors())

//Database Connection
mongoose.connect(mongoDbUrl, {})
  .then(() => console.log("Database Connected"))
  .catch(err => console.error("Database connection error:", err));

//Routes
app.use("/api/appointments", appointmentRouter);
app.use("/api/therapy-bookings", therapyBookingRouter);
app.use("/api/doctors", doctorRouter);

app.get("/",
    (req,res)=>{
        console.log()
        console.log(req.body)
        console.log("This is a get request");
    res.json({
        messages:"This is a get request"
    })

    }
)
app.post("/",
    (req,res)=>{
      console.log(req.body)
      console.log("This is a post request");
    res.json({
        messages:"This is a post request"
    })
    }     
)


app.listen(
    5000,
    ()=>{
        console.log("Server is running on port 5000");
    }
)