const express = require("express");

const router = express.Router();

const { getUser, registerUser, deleteUser } = require('../controllers/user');

router.get("/users", getUser);
router.post("/user", registerUser);
router.delete("/user/:id", deleteUser);

module.exports = router;