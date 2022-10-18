var admin = require("firebase-admin");

var serviceAccount = require("./firebase-key.json");

const BUCKET_URL = "blog-imagens.appspot.com";
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET_URL,
});

const bucket = admin.storage().bucket();

const uploadImage = (req, res, next) => {
  if (!req.file) {
    return next();
  }
  const image = req.file;
  const filename = Date.now() + "-" + image.originalname;

  const fileToUpload = bucket.file(filename);

  const fs = fileToUpload.createWriteStream({
    metadata: {
      contentType: image.mimetype,
    },
  });

  fs.on("error", (e) => {
    console.error(e);
  });

  fs.on("finish", async () => {
    // make file public
    await fileToUpload.makePublic();

    // add file url to the req body
    req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET_URL}/${filename}`;
    next();
  });

  fs.end(image.buffer);
};

module.exports = uploadImage;
