const { uploadImage, getAllPhotoUrls } = require('../config/firebaseConfig')

const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })


const addImage = async (req, res) => {
    // Use the Multer middleware to handle file upload
    upload.single("image")(req, res, (err) => {

        const { name } = req.body
        const nameString = JSON.stringify(name)

        if (!name) return res.status(400).send("Please put name")
        if (!req.file.path) return res.send("No file").status(400)

        try {
            // ginamit ko yung uploadImage na middleware na ginawa ko galing config
            uploadImage(req.file.path, `multer/${nameString}`);
            // console.log(200); // Logging 200 to the console
            return;
        } catch (error) {
            console.error('Error uploading image to Firebase:', error);
            res.status(500).send('Error uploading image');
        }
    });

    // This line won't log "200" to your console, it sends a response with status 200 to the client
    res.status(200).send("Done");
};


const getAllPhoto = async (req, res) => {
    try {
        const folderPath = "multer";
        const urls = await getAllPhotoUrls(folderPath)
        res.status(200).send(urls)
    } catch (error) {
        console.log(error)
    }
}

const test = (req,res) => {
    res.send("This is working!")
}


module.exports = {
    addImage,
    getAllPhoto,
    test
}