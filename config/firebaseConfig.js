//ALL OF THIS IS FOR THE FIREBASE CONFIGURATION
const admin = require("firebase-admin");

const firebaseConfigSecret= JSON.parse(process.env.FIREBASE_CONFIG)
const serviceAccount = firebaseConfigSecret;

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // storageBucket: "gs://imgtourl-d501f.appspot.com" // Replace this with your storage bucket URL

    storageBucket: process.env.FIREBASE_STORAGE_BUCKET // Replace this with your storage bucket URL

});

// Reference to the Firebase Storage bucket
const bucket = admin.storage().bucket();
const storage = admin.storage();

// Function to upload image to Firebase Storage
async function uploadImage(filePath, destinationPath) {
    try {
        // Upload the file to the bucket
        await bucket.upload(filePath, {
            destination: destinationPath,
            // You can also set metadata for the uploaded file
            metadata: {
                contentType: "image/jpeg", // Specify content types as an array
            },
        });
        console.log("Image uploaded successfully.");
    } catch (error) {
        console.error("Error uploading image:", error);
    }
}

async function getAllPhotoUrls(folderPath) {
    try {
        // List all files in the bucket
        const [files] = await storage.bucket().getFiles({ prefix: folderPath });

        const photoUrls = {};

        // Get download URLs for each file
        for (const file of files) {
            const [url] = await file.getSignedUrl({
                action: "read",
                expires: "01-01-3000" // Adjust expiration date as needed
            });

            // Extract filename from file path
            const fileName = file.name.split("/").pop();

            // Add URL to JSON object with filename as key
            photoUrls[fileName] = url;
        }

        return photoUrls;
    } catch (error) {
        console.error("Error retrieving photo URLs:", error);
        throw error;
    }
}










//ALL OF THIS IS FOR THE FIREBASE CONFIGURATION

module.exports = { uploadImage,getAllPhotoUrls }

