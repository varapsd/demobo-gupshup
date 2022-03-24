const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

app.use(express.json());

var url = process.env.MONGOURL;
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: '));
db.once('open', function (callback) { 
    console.log('Successfully connected to MongoDB.');
});

app.get('/', (req, res) => {
    res.send("hello world. !");
});

const { botServies } = require("./Services/botServices");
app.post('/whatsapp', async (req, res) => {

     if (req.body.type == "message") {
        const response = await botServies(req);
        console.log(response);
        res.send(response);
        return ;
    }
    else{
        return res.sendStatus(200);
    }
});

const { addNewProduct } = require("./Models/Products");
app.post("/addProduct", async (req,res)=>{
    console.log(req.body);
    let response = await addNewProduct(req.body);
    if(response.status == 400){
        console.log(response.data);
    }
    res.sendStatus(response.status);
})
 
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server is up and running at ${PORT}`);
})