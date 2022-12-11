const { newCustomer, getCustomer, getAllCustomers, getCustConts } = require("../controllers/customer");
const express = require("express")
const router = express.Router();


router.post("/addcustomer", newCustomer);
router.get("/getcustomer", getCustomer)
router.get("/getallcustomers", getAllCustomers)
router.get("/getcustconts", getCustConts)

module.exports = router;