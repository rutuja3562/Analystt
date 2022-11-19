const express = require("express");
const cors = require("cors");
const connect = require("./configs/db");
const app = express();

const port=process.env.PORT||7005

app.use(express.json())
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

const todoController = require("./controller/todo.controller")


app.use("/todos", todoController);

app.listen(port, async () => {
    try {
        await connect();
        console.log("listing on port 7005")
    } catch (err) {
        console.log(err.message);
    }

})