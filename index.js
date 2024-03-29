const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer')
require('dotenv').config();

const options = {cors: {
    origin: "*"
  }};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage: storage })

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(cors());


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
app.get("/check",(req,res) => {
    res.send("check")
})

const { botServies } = require("./Services/botServices");
app.post('/whatsapp', async (req, res) => {

    console.log(req.body);

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

const { milkService } = require('./Services/milkService');
app.post("/milk", async( req,res)=>{
    console.log(req.body);
    if(req.body.type == "message"){
        const response = await milkService(req);
        console.log(response);
        res.send(response);
        return;
    }
    else{
        return res.sendStatus(200);
    }
})

const { addNewProduct } = require("./Models/Products");
app.post("/addProduct", async (req,res)=>{
    console.log(req.body);
    let response = await addNewProduct(req.body);
    if(response.status == 400){
        console.log(response.data);
    }
    res.sendStatus(response.status);
})

const { getAllProducts, updateProduct } = require("./Models/Products");
app.get("/getAllProducts", async (req,res)=>{
    const response = await getAllProducts();
    res.send(response);
})


app.post("/updateProduct", async (req,res)=>{
    const response = await updateProduct(req.body);
    console.log(response);
    if(response.status == 200){
        res.send({"isSuccess":"true"})
    }
    else{
        res.send({"isSuccess":"false"})
    }
})

const { getAllOrders } = require("./Models/Orders");
app.get("/getAllOrders", async(req,res)=>{
    const response = await getAllOrders();
    res.send(response);
})

const { getAllEnquiries } = require("./Models/Enquiry");
app.get("/getAllEnquiries", async(req,res)=>{
    const response = await getAllEnquiries();
    res.send(response);
})

app.post('/image', upload.single('file'), function (req, res) {
    res.send("done");
  })
 
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server is up and running at ${PORT}`);
})