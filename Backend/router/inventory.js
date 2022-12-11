const express = require("express")
const router = express.Router();
const cookieParser = require("cookie-parser")

const { getCarDetails, getSoldCars, getHireCars, getSaleCars, newInventory, getOneCar, getDriDetails, getLuxDetails, getPerDetails } = require("../controllers/inventory");

router.use(cookieParser())

router.get("/cardetails", getCarDetails);
router.get("/hirecars", getHireCars);
router.get("/forsale", getSaleCars);
router.post("/newinventory", newInventory);
router.get("/getonecar", getOneCar)
router.get("/getdrivfeatures", getDriDetails)
router.get("/getperfeatures", getPerDetails)
router.get("/getluxfeatures", getLuxDetails)
router.get("/getsoldcars", getSoldCars)

module.exports = router;