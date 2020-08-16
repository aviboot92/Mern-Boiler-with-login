const router = require("express").Router();
const authController = require("../../controllers/authController");
const auth = require('./../../middleware/auth');


// Matches with "/api/auth"
router
  .route("/")
  .get(auth, authController.getAuthUser)
  .post(authController.loginUser);

module.exports = router;