const express = require("express");
const router = express.Router();

router.use("/users", require("./users"));
router.use("/transactions", require("./transaction"));

module.exports = router;
