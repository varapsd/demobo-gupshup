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

module.exports = {
    addNewProduct,
    getAllProducts,
    getProductByTitle
}