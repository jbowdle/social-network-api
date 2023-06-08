const router = require("express").Router();
const { test } = require("../../controllers/userController");

router.route("/test").get(test);

module.exports = router;