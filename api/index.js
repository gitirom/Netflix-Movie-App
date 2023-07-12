const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const authRoute = require("./routes/auth");
const userRoute = require("./routes/Users");
const movieRoute = require("./routes/Movies");
const listsRoute = require("./routes/Lists");

const app = express(); 



dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology :true,
})
.then(() => console.log("DB Connection Successful!"))
.catch((err) => console.log(err));

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movie", movieRoute);
app.use("/api/lists", listsRoute);



app.listen(8800, () => {
    console.log(' Backend Server is running! ');
});