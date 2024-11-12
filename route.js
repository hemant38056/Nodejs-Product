const express = require('express');
const prd_obj = require('./controller/ProductController');
const router = express.Router();

// Three Library for file upload  Any Type
const multer = require('multer'); // Upload the Destination Location

const fs = require('fs'); // Handle The File Type and Read

const path = require('path'); // Find The Where you Want To Store

//...........End..............

//Set up Multer for file upload
const storage = multer.diskStorage({
    destination : function(req, file, cb){
        const uploadDir = './static/product_image';
        if(!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename : function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname)); // unique file name (images or file)
        // cb(null, file.originalname);
    }
});

const upload = multer({storage: storage});

router.get('/', (req, res) => {
    res.render('Home');
    res.end();
})

// router.get('/Product_list', (req, res) => {
//     res.render('Product');
//     res.end();
// })


router.use('/Add_Product', upload.single('photo'), (req, res) => {
    prd_obj.Add_Product(req, res);
})

router.use('/Product_list', (req, res) => {
    prd_obj.Fetch_Products(req, res);
})

router.post('/update_records1',(req,res)=>{
    prd_obj.Buy_Products(req,res)
})

module.exports = router;