const express = require("express");
const router = express.Router();
const { authenticated } = require("../middlewares/auth");
const { checkRolePartner, checkRoleUser } = require("../middlewares/checkRole");

const { getUser, registerUser, deleteUser, login, getUserById } = require('../controllers/user');
const { getProducts, getProductsByPartner, getDetailProduct, addProduct, updateProduct, deleteProduct } = require('../controllers/product');
const { getTranscation, addTranscation, updateStatusTransaction, deleteTransaction } = require('../controllers/transaction');
const { uploadFile } = require('../middlewares/upload');

// user api
router.get("/users", getUser);
router.get("/user-by-id", authenticated, getUserById);
router.post("/user-login", login);
router.post("/user", uploadFile("imageFile"), registerUser);
router.delete("/user/:id", authenticated, deleteUser);


// products api
router.get("/products", getProducts);
router.get("/products-by-partner/:id", authenticated, getProductsByPartner);
router.get("/product-detail/:id", getDetailProduct);
router.post("/add-product", addProduct);
router.patch("/update-product/:id", authenticated, updateProduct);
router.delete("/delete-product/:id", authenticated, deleteProduct);

// Transactions Api
router.get("/transactions/", authenticated, getTranscation);
router.post("/transactions/", authenticated, checkRoleUser, addTranscation);
router.patch("/transaction/:id", authenticated, updateStatusTransaction);
router.delete("/delete-transaction/:id", authenticated, deleteTransaction);

module.exports = router;