
const { getAllProducts } = require("../Models/Products");
const botServies = async (req)=>{

    if(req.body.payload.type === "text"){
        const allProducts = await getAllProducts();
        const response = {
            "type":"quick_reply",
            "msgid":"productMenu",
            "content":{ 
                "type":"text", 
                "header": "Hi " + req.body.payload.sender.name, 
                "text":"We have list of products, select a product !!" 
            }
        
        }
        let options = allProducts.map(product => {
            return { type : "text", title : product.name }
        })
        response.options = options;
        return response;
    }
}

module.exports = {
    botServies
}