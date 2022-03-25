const mongoose = require('mongoose');

var ProductSchema = mongoose.Schema({
    productId : Number,
    name : String,
    category : String,
    isActive : Boolean,
    quantity : Number,
    stock : Number,
});

const Product = mongoose.model('product',ProductSchema);

const addNewProduct = async (req)=>{
    console.log(req);
    var newProduct = new Product({
        productId : await Product.countDocuments({}) + 1,
        name : req.name,
        category : req.category,
        isActive : req.isActive,
        quantity : req.quantity,
        stock : req.stock,
    })
    return newProduct.save()
        .then((usr) => {
            return {status:200, data:usr};
        })
        .catch(err => {
            return {status:400, data:err};
        });
}
const getProductByTitle = async(productTitle)=>{
    return Product.findOne({name:productTitle});
}
const getAllProducts = async ()=>{
    return Product.find({});
}

const getActiveProducts = async ()=>{
    return Product.find({isActive:true});
}
const updateProduct = async (req)=>{
    const validProduct = await Product.findOne({_id : req._id});
    if(validProduct){
        validProduct.name = req.name;
        validProduct.category = req.category;
        validProduct.isActive = req.isActive;
        validProduct.quantity = req.quantity;
        validProduct.stock = req.stock;
        return validProduct.save()
            .then((product) => {
                return {status:200, data:product};
            })
            .catch(err => {
                return {status:400, data:err};
            });
    }
    else{
        return {status:400, data:err};
    }
}

module.exports = {
    addNewProduct,
    getAllProducts,
    getProductByTitle,
    updateProduct,
    getActiveProducts
}