const express = require("express");

const DogApi = require("../api/dog");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware(), DogApi.findAllDogs);
router.get("/:id", authMiddleware(), DogApi.findOneDog);
router.post("/", authMiddleware(['admin']), DogApi.createDog);
router.put("/:id", authMiddleware(['admin']), DogApi.updateDog);
router.delete("/:id", authMiddleware(['admin']), DogApi.deleteDog);

module.exports = router;
