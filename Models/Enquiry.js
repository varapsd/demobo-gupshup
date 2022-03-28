const mongoose = require('mongoose');

var EnquirySchema = mongoose.Schema({
    enquiryId : Number,
    productId : Number,
    phone : Number,
    name : String
});

const Enquiry = mongoose.model('enquiry',EnquirySchema);


const addNewEnquiry = async (req)=>{
    var newEnquiry = new Enquiry({
        enquiryId : await Enquiry.countDocuments({}) + 1,
        productId : req.productId,
        phone : req.phone,
        name : req.name
    })
    return newEnquiry.save()
        .then((enq) => {
            return {status:200, data:enq};
        })
        .catch(err => {
            return {status:400, data:err};
        });
}

const getAllEnquiries = async ()=>{
    return Enquiry.find({});
}


module.exports = {
    addNewEnquiry,
    getAllEnquiries
}