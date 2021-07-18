const express = require("express");
const controller = require("../controller/controller");
const router = express.Router();

router.post("/create", controller.create);
router.post("/run-scrapping", controller.run);
router.get("/get", controller.get);
router.post("/db", controller.isInDb);

module.exports = router;
