/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

 const {onRequest} = require("firebase-functions/v2/https");
 const logger = require("firebase-functions/logger");
 
 const functions = require("firebase-functions");
 const admin = require("firebase-admin")
 require("dotenv").config()
 
 const serviceAccountKey = require('./serviceAccountKey.json')
 
 const express = require('express');
 const app = express();
 
 // Body parser for JSON data
 
 app.use(express.json());
 
 // cross orgin
 
 const cors = require('cors');
 app.use(cors({ origin: true }));
 app.use((req, res, next) => {
     res.set("Access-Control-Allow-Origin", "*");
     next();
 });
 
 // firebase credentials
 
 admin.initializeApp({
     credential: admin.credential.cert(serviceAccountKey)
   });
 
   // API endpoints
   app.get("/", (req, res) => {
     return res.send("hello world");
   })

   const userRoute = require('./routes/user');
   const productRoute = require('./routes/products');
   const adminRoute = require('./routes/admin');

   app.use('/api/users', userRoute);
   app.use('/api/products', productRoute);
   app.use('/api/admin', adminRoute)
 
   exports.app = functions.https.onRequest(app);