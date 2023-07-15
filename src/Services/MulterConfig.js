const multer = require("multer");
const path = require( "express/lib/application");
const crypto = require("crypto");

const storage = multer.diskStorage({

    destination:(req, res, callback)=>{
        callback(null, "C:/Users/gabri/Desktop/API-OrkutAngular/src/Data/Uploads"); //<-- resolver isso
    },
    filename:(req,res, callback)=>{
        const fileName = `file_${crypto.randomUUID()}.jpg`;
        callback(null,fileName);
    }
    
});

module.exports = storage
