const router = require("express").Router();
const{receiveEmail} =require("../controller/EmailController")

router.post("/",receiveEmail)

module.exports = router;