
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
        name : "A2 GIR COW MILK",
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

const gheeProducts = [
    {
        name : "CULTURED GHEE",
        description : "Add a gold touch to your cooking with provalic cultured Ghee.",
        available : "500 ml glass jar",
        mrp : "INR 475 for 500 ml",
        BottleShellLife : "4 months or 120 days"
    },
    {
        name : "A2 GHEE",
        description : "Bring home this golder elixir",
        available : "500ml glass jar",
        mrp : "INR 900 for 500ml",
        BottleShellLife : "4 months or 120 days"
    },
    {
        name : "BUFFALO GHEE",
        description : "Finest Buffalo Ghee available in glass Jars",
        available : "500ml glass jar",
        mrp : "INR 500 for 500ml",
        BottleShellLife : "4 months or 120 days"
    },
    {
        name : "KHARWAS",
        description : "We bring you most Healthy & delectable sweet KHARWAS",
        available : "120g jar",
        mrp : "INR 65",
        BottleShellLife : "2  to 3 days"
    }
]

const moreProducts = [
    {
        name : "A2 MILK VALUE PACK",
        description : "Home bred, hapy Gir cows, a pleasnt environment setting of Provilac",
        available : "500 ml and 1000ml",
        mrp : "INR 50 for 500 ml and INR 85 for 1000ml pouch",
        BottleShellLife : "2 days"
    },
    {
        name : "BUFFALO MILK VALUE PACK",
        description : "Buffalo Milk is a nutrient fill that reduces the health gap created",
        available : "500ml pouch",
        mrp : "INR 50 for 500ml pouch",
        BottleShellLife : "2 days"
    },
    {
        name : "PANEER A2 GIR COW MILK",
        description : "Paneer made from 100% pure untouched A2 Gir cows milk vaccuum packed",
        available : "200g Pouch",
        mrp : "INR 195"
    },
    {
        name : "PANEER COW MILK",
        description : "Paneer made from 100% pure untouched cows milk vaccuum packed",
        available : "200G Pouch",
        mrp : "INR 95"
    }
]

const getCategories = async()=>{
    return ["MILK PRODUCTS", "GHEE PRODUCTS", "MORE PRODUCTS"]
}
const milkService = async (req)=>{

    if(req.body.payload.type === "text"){
        const allProducts = await getCategories();
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
            return { type : "text", title : product }
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