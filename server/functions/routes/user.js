const router = require("express").Router();
const admin = require("firebase-admin");
let data = [];

router.get("/", (req, res) => {
  return res.send("Inside the user router");
});

router.get("/jwtVerification", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ success: false, msg: "Authorization token not found" });
  }

  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodedValue = await admin.auth().verifyIdToken(token);
    if (!decodedValue) {
      return res.status(401).json({ success: false, msg: "Unauthorized access" });
    }

    // Check for the "admin" claim in the decoded token
    const isAdmin = decodedValue && decodedValue.admin === true;

    return res.status(200).json({ success: true, data: { ...decodedValue, admin: isAdmin } });
  } catch (err) {
    return res.status(500).json({ success: false, message: `Error in extracting the token: ${err}` });
  }
});


const listAllUsers = async (nextPageToken) => {
  // List batch of users, 1000 at a time.
  admin
    .auth()
    .listUsers(1000, nextPageToken)
    .then((listUsersResult) => {
      listUsersResult.users.forEach((userRecord) => {
        data.push(userRecord.toJSON());
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(listUsersResult.pageToken);
      }
    })
    .catch((error) => {
      console.log('Error listing users:', error);
    });
};
// Start listing users from the beginning, 1000 at a time.
listAllUsers();

router.get("/all", async (req, res) => {
  listAllUsers();
  try {
    return res
      .status(200)
      .send({ success: true, data: data,})
  } catch (err) {
    return res.send({
      success: false,
      msg: `Error in listing users :,${err}`,
    });
  }
});

module.exports = router;
