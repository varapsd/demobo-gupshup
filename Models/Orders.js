const mongoose = require('mongoose');

var OrderSchema = mongoose.Schema({
    orderId : Number,
    productId : Number,
    phone : Number,
    name : String,
    status : String
});

const Order = mongoose.model('order',OrderSchema);


const addNewOrder = async (req)=>{
    var newOrder = new Order({
        orderId : await Order.countDocuments({}) + 1,
        productId : req.productId,
        phone : req.phone,
        name : req.name,
        status : "processing",
    })
    return newOrder.save()
        .then((ord) => {
            return {status:200, data:ord};
        })
        .catch(err => {
            return {status:400, data:err};
        });
}

const getAllOrders = async ()=>{
    return Order.find({});
}

const updateOrder = async (req)=>{
    const validOrder = await Order.findOne({_id : req._id});
    if(validOrder){
        validOrder.status = req.status;
        return validOrder.save()
            .then((ord) => {
                return {status:200, data:ord};
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
    addNewOrder,
    getAllOrders,
    updateOrder
}