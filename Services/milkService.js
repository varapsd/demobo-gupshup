
const milkProducts = [
    {
        name : "PASTERUIZED MILK",
        description : "Milked from the finest HF cattle through a completely automated",
        available : "500 ml and 1000 ml",
        mrp : "INR 50 for 500 ml and INR 80 for 1000ml",
        BottleShellLife : "3 days"
    }
]
const milkService = async (req)=>{

    if(req.body.payload.type === "text"){
        const allProducts = milkProducts;
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
            return { type : "text", title : product.name, description : product.description }
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
    /*
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
    */
}

module.exports = {
    milkService
}