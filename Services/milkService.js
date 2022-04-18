
const getCategories = async()=>{
    return ["MILK PRODUCTS", "GHEE PRODUCTS", "MORE PRODUCTS"]
}

const milkProducts = [
    {
        id : 1,
        name : "PASTERUIZED MILK",
        description : "Milked from the finest HF cattle through a completely automated",
        available : "500 ml and 1000 ml",
        mrp : "INR 50 for 500 ml and INR 80 for 1000ml",
        BottleShellLife : "3 days"
    },
    {
        id : 2,
        name : "RAW MILK",
        description : "Provailac Raw Milk stands out of its absolute prutiy.",
        available : "1000 ml",
        mrp : "INR 80 for 1000 ml",
        BottleShellLife : "3 days"
    },
    {
        id : 3,
        name : "A2 GIR COW MILK",
        description : "Home bred, hapy Gir cows, a pleasnt environment setting of Provilac",
        available : "1000 ml",
        mrp : "INR 90 for 1000 ml",
        BottleShellLife : "2 days"
    },
    {
        id : 4,
        name : "BUFFALO MILK",
        description : "Buffalo Milk is a nutrient fill that reduces the health gap created",
        available : "1000 ml",
        mrp : "INR 95 for 1000 ml",
        BottleShellLife : "2 days"
    }
]

const gheeProducts = [
    {
        id : 1,
        name : "CULTURED GHEE",
        description : "Add a gold touch to your cooking with provalic cultured Ghee.",
        available : "500 ml glass jar",
        mrp : "INR 475 for 500 ml",
        BottleShellLife : "4 months or 120 days"
    },
    {
        id : 2,
        name : "A2 GHEE",
        description : "Bring home this golder elixir",
        available : "500ml glass jar",
        mrp : "INR 900 for 500ml",
        BottleShellLife : "4 months or 120 days"
    },
    {
        id : 3,
        name : "BUFFALO GHEE",
        description : "Finest Buffalo Ghee available in glass Jars",
        available : "500ml glass jar",
        mrp : "INR 500 for 500ml",
        BottleShellLife : "4 months or 120 days"
    },
    {
        id : 4,
        name : "KHARWAS",
        description : "We bring you most Healthy & delectable sweet KHARWAS",
        available : "120g jar",
        mrp : "INR 65",
        BottleShellLife : "2  to 3 days"
    }
]

const moreProducts = [
    {
        id : 1,
        name : "A2 MILK VALUE PACK",
        description : "Home bred, hapy Gir cows, a pleasnt environment setting of Provilac",
        available : "500 ml and 1000ml",
        mrp : "INR 50 for 500 ml and INR 85 for 1000ml pouch",
        BottleShellLife : "2 days"
    },
    {
        id : 2,
        name : "BUFFALO MILK VALUE PACK",
        description : "Buffalo Milk is a nutrient fill that reduces the health gap created",
        available : "500ml pouch",
        mrp : "INR 50 for 500ml pouch",
        BottleShellLife : "2 days"
    },
    {
        id : 3,
        name : "PANEER A2 GIR COW MILK",
        description : "Paneer made from 100% pure untouched A2 Gir cows milk vaccuum packed",
        available : "200g Pouch",
        mrp : "INR 195"
    },
    {
        id : 4,
        name : "PANEER COW MILK",
        description : "Paneer made from 100% pure untouched cows milk vaccuum packed",
        available : "200G Pouch",
        mrp : "INR 95"
    }
]


const productMenu = async (req)=>{
    const categoryTitle = req.payload.payload.title;
    var allProducts;
    switch (categoryTitle) {
        case "MILK PRODUCTS":
            allProducts = milkProducts;
            break;
        case "GHEE PRODUCTS" : 
            allProducts = gheeProducts;
            break;
        case "MORE PRODUCTS" : 
            allProducts = moreProducts;
            break;
        default:
            break;
    }
    //const allProducts = milkProducts;
    let options = allProducts.filter(ele => {
       return ele;
    }).map(product =>{
        return { type : "text", title : product.name, description : product.description }
    })

    console.log(options);
    const mainMenu = {
        "type": "list", 
        "title": "Milk Products" , 
        "body": "We have list of milk products, select a product !!", 
        "msgid": "productDetails-"+categoryTitle, 
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

const productDetails = async(req) =>{
    const productTitle = req.payload.payload.title;
    const productCategory = req.payload.payload.id.split("-")[1];
     
    var allProducts;
    switch (productCategory) {
        case "MILK PRODUCTS":
            allProducts = milkProducts;
            break;
        case "GHEE PRODUCTS" : 
            allProducts = gheeProducts;
            break;
        case "MORE PRODUCTS" : 
            allProducts = moreProducts;
            break;
        default:
            break;
    }
    let productDetailsDTO;

    for (let index = 0; index < allProducts.length; index++) {
        const element = array[index];
        if(element.name === productTitle){
            productDetailsDTO = element;
            break;
        }
    }
    //const productDetailsDTO = await getProductByTitle(productTitle);
    //const responseDTO = await addNewEnquiry({ productId : productDetailsDTO.productId, name : req.payload.sender.name, phone : req.payload.sender.phone})
    const response = {
        "type":"quick_reply",
        "msgid":"productDetails-"+productCategory+"-"+productDetailsDTO.id,
        "content":{ 
            "type":"text", 
            "header": productDetailsDTO.name, 
            "text":`${productDetailsDTO.description}\n
                    Available In : ${productDetailsDTO.available}\n
                    MRP : ${productDetailsDTO.mrp}\n
                    Bottle Shelf Life : ${productDetailsDTO.BottleShellLife ? productDetailsDTO.BottleShellLife : "NONE"}`
        },
        "options":[ 
            { 
                "type":"text", 
                "title":"order"
            }
        ]
    }
    return response;
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
    else if( req.body.payload.type === "list_reply"){
        let queryType = req.body.payload.payload.id.split('-')[0];
        switch(queryType){
            case "categoryMenu" : return await productMenu(req.body);
            case "productDetails" : return await productDetails(req.body);
        }
    }
    /*
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