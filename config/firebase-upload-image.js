var admin = require("firebase-admin");
require("dotenv").config();

const BUCKET_URL = "blog-imagens.appspot.com";

admin.initializeApp({
  credential: admin.credential.cert({
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_CERT,
    client_x509_cert_url: process.env.CLIENT_CERT_URL,
    client_email: process.env.CLIENT_EMAIL,
  }),
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
