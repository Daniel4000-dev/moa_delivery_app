// admin.js

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

const isAdminUser = (uid) => {
    // Define a list of admin UIDs or any other criteria that determine admin access
    const adminUIDs = ['CSX6wsOyjuM9mVULPjbtSOB2C0u1'];
  
    // Check if the provided UID is in the list of admin UIDs
    if (adminUIDs.includes(uid)) {
      return true;
    }
  
    // If not found in the list, return false to deny admin access
    return false;
  }
  
// API endpoint to set the "admin" role for a user
router.post('/setAdminRole', async (req, res) => {
    const { uid } = req.body;
  
    // Check if the UID is one of your admin UIDs or meets certain conditions
    if (isAdminUser(uid)) {
      try {
        // Set the "admin" claim for the user
        await admin.auth().setCustomUserClaims(uid, { admin: true });
  
        // Fetch the updated user data, including the "admin" claim
        const user = await admin.auth().getUser(uid);
  
        // Return the updated user data
        res.status(200).json({ success: true, user });
      } catch (error) {
        res.status(500).json({ success: false, message: `Error setting admin role: ${error.message}` });
      }
    } else {
      res.status(403).json({ success: false, message: 'Permission denied' });
    }
  });
  
  

module.exports = router;
