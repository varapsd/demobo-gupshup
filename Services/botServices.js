
const { getAllProducts, getProductByTitle, getActiveProducts } = require("../Models/Products");

const productDetails = async (productTitle)=>{
    const productDetailsDTO = await getProductByTitle(productTitle);
    const response = {
        "type":"quick_reply",
        "msgid":"productDetails-"+productDetailsDTO.productId,
        "content":{ 
            "type":"text", 
            "header": productDetailsDTO.name+" Details", 
            "text":`1. Product Name :  ${productDetailsDTO.name}\n2. Product Category : ${productDetailsDTO.category}\n3. Available Stock : ${productDetailsDTO.stock}`
        },
        "options":[ 
            { 
                "type":"text", 
                "title":"sample image"
            }, 
            { 
                "type":"text", 
                "title":"order"
            }
        ]
    }
    return response;
}

const productProcess = async (action, productId)=>{
    if(action == "sample image"){
        return{
            "type": "text",
            "text": "sample image will be sent!!"
        }
    }
    else if( action == "order"){
        return {
            type : "text",
            text : `Order for ${productId} is conformed. Thank you !!`
        }
    }
    else {
        return  {
            "type": "text",
            "text": "Sorry ... Error !!"
    }
    }
}
const botServies = async (req)=>{

    if(req.body.payload.type === "text"){
        const allProducts = await getActiveProducts();
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
    else if( req.body.payload.type === "button_reply"){
        let queryType = req.body.payload.payload.id.split('-')[0];
        switch(queryType){
            case "productMenu" : return await productDetails(req.body.payload.payload.title);
            case "productDetails" : return await productProcess(req.body.payload.payload.title, req.body.payload.payload.id.split('-')[1]);
        }
    }
}

module.exports = {
    botServies
}