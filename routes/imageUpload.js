const express = require("express");
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('./cors');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})




const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter});

const imageUploadRouter = express.Router();

imageUploadRouter.use(bodyParser.json());

imageUploadRouter.route('/')
.post(cors.corsWithOptions, upload.array('photo', 6), (req, res, next) => {
    console.log(req.files);
    res.json(req.files);
})


module.exports = imageUploadRouter;