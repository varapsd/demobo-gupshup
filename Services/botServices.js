
const { getAllProducts, getProductByTitle, getActiveProducts } = require("../Models/Products");
const { addNewEnquiry } = require("../Models/Enquiry")
const {addNewOrder} = require("../Models/Orders");
const productDetails = async (req)=>{
    const productTitle = req.payload.payload.title;
    const productDetailsDTO = await getProductByTitle(productTitle);
    const responseDTO = await addNewEnquiry({ productId : productDetailsDTO.productId, name : req.payload.sender.name, phone : req.payload.sender.phone})
    const response = {
        "type":"quick_reply",
        "msgid":"productDetails-"+productDetailsDTO.productId,
        "content":{ 
            "type":"text", 
            "header": productDetailsDTO.name+" Details", 
            "text":`1. Product Name :  ${productDetailsDTO.name}\n2. Product Category : ${productDetailsDTO.category}\n3. Available Quantity : ${productDetailsDTO.quantity}\n4. Available Price : ${productDetailsDTO.price}`
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

const productProcess = async (req)=>{
    const action = req.body.payload.payload.title;
    const productId = req.body.payload.payload.id.split('-')[1];
    if(action == "sample image"){
        const response = {
            "type":"quick_reply",
            "msgid":"productDetails-"+productId,
            "content":{ 
                "type":"image",
                "text": "Sample Image",
                "url":"https://demo-gupshup-flow.herokuapp.com/images/"+productId+".jpg",
            },
            "options":[ 
                { 
                    "type":"text", 
                    "title":"order"
                }
            ]
        }
        return response;
        /*
        return{
            "type": "text",
            "text": "sample image will be sent!!"
        }
        */
    }
    else if( action == "order"){
        const response = await addNewOrder({productId:productId,phone: req.body.payload.sender.phone, name: req.body.payload.sender.name });
        if(response.status == 200){
            return {
                type : "text",
                text : `Order for ${productId} is confirmed. Thank you !!`
            }
        }
        else{
            return  {
                "type": "text",
                "text": "Sorry ... Something went wrong, we will contact you !!"
            }
        }
        
    }
    else {
        return  {
            "type": "text",
            "text": "Sorry ... Error !!"
        }
    }
}

const productMenu = async (req)=>{
    const categoryTitle = req.payload.payload.title;
    const allProducts = await getActiveProducts();
    let options = allProducts.filter(product => {
        if(product.category === categoryTitle) return ;
    }).map(product =>{
        return { type : "text", title : product.name }
    })

    console.log(options);
    const mainMenu = {
        "type": "list", 
        "title": "Availabe Product" , 
        "body": "We have list of products, select a product !!", 
        "msgid": "productDetails", 
        "globalButtons": [
            { 
                "type": "text", 
                "title": "Products" 
            }
        ], 
        "items": [
            { 
                "title": "Menu",
                "options": options
            }
        ]
    }

    return mainMenu;
}
const botServies = async (req)=>{

    if(req.body.payload.type === "text"){
        const allProducts = await getActiveProducts();
        /*
        const response = {
            "type":"quick_reply",
            "msgid":"productMenu",
            "content":{ 
                "type":"text", 
                "header": "Hi " + req.body.payload.sender.name, 
                "text":"We have list of products, select a product !!" 
            }
        
        }
        */

        let options = allProducts.map(product => {
            return { type : "text", title : product.category }
        })

        const mainMenu = {
            "type": "list", 
            "title": "hi " + req.body.payload.sender.name, 
            "body": "We have list of categories, select a category !!", 
            "msgid": "categoryMenu", 
            "globalButtons": [
                { 
                    "type": "text", 
                    "title": "Categories" 
                }
            ], 
            "items": [
                { 
                    "title": "Menu",
                    "options": options
                }
            ]
        }
        
        console.log(options);
        //mainMenu.items.options = options;
        return mainMenu;
    }
    else if( req.body.payload.type === "list_reply"){
        let queryType = req.body.payload.payload.id.split('-')[0];
        switch(queryType){
            case "categoryMenu" : return await productMenu(req.body);
            case "productDetails" : return await productDetails(req.body);
        }
    }
    else if( req.body.payload.type === "button_reply"){
        let queryType = req.body.payload.payload.id.split('-')[0];
        switch(queryType){
            case "productDetails" : return await productProcess(req);
        }
    }
}

module.exports = {
    botServies
}