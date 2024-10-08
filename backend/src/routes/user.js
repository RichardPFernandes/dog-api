const express = require("express");

const UserApi = require("../api/user");
const router = express.Router();

router.put("/:id", UserApi.updateUser);
router.get("/", UserApi.findUsers); 
router.get("/context", UserApi.findContext);
router.delete("/:id", UserApi.deleteUser);
router.post("/admin", UserApi.createUser);

module.exports = router;
