const express = require("express")
const router = express.Router();
const cookieParser = require("cookie-parser")

const { getUserInfo, getAddr, getConts, createUser, login, getDriv, getGen, getSp, logout, getOneDriv, getOneSales } = require("../controllers/users");

router.use(cookieParser())

router.post("/createuser", createUser);
router.get("/getuser", getUserInfo);
router.get("/getdrivers", getDriv);
router.get("/getsalespersons", getSp);
router.get("/getemployees", getGen);
router.post("/login", login);
router.get("/logout", logout);
router.get("/contacts", getConts);
router.get("/addresses", getAddr);
router.get("/getond", getOneDriv)
router.get("/getsl", getOneSales)

module.exports = router