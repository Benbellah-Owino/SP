const express = require("express")
const router = express.Router();

const { hire, sale, updateHire, updateSale, getHire, getSale } = require("../controllers/transactions")

router.get("/gethires", getHire);
router.get("/getsales", getSale);
router.post("/hirecar", hire);
router.post("/sellcar", sale);
router.post("/updatehire", updateHire);
router.post("/updatesale", updateSale);

module.exports = router;