
const milkProducts = [
    {
        name : "PASTERUIZED MILK",
        description : "Milked from the finest HF cattle through a completely automated",
        available : "500 ml and 1000 ml",
        mrp : "INR 50 for 500 ml and INR 80 for 1000ml",
        BottleShellLife : "3 days"
    },
    {
        name : "RAW MILK",
        description : "Provailac Raw Milk stands out of its absolute prutiy.",
        available : "1000 ml",
        mrp : "INR 80 for 1000 ml",
        BottleShellLife : "3 days"
    },
    {
        name : "A@ GIR COW MILK",
        description : "Home bred, hapy Gir cows, a pleasnt environment setting of Provilac",
        available : "1000 ml",
        mrp : "INR 90 for 1000 ml",
        BottleShellLife : "2 days"
    },
    {
        name : "BUFFALO MILK",
        description : "Buffalo Milk is a nutrient fill that reduces the health gap created",
        available : "1000 ml",
        mrp : "INR 95 for 1000 ml",
        BottleShellLife : "2 days"
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