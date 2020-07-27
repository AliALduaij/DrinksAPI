const express = require("express")
const router = express.Router();

const upload = require("./multer")
const { drinkList, drinkDelete, drinkUpdate, fetchDrink } = require("../controllers/drinkControlles")




router.get("/", drinkList);




router.delete("/:drinkID", drinkDelete)



router.put("/:drinkID", upload.single("image"), drinkUpdate)

router.param("drinkID", async (req, res, next, drinkID) => {
    const drink = await fetchDrink(drinkID, next)
    if (drink) {
        req.drink = drink
        next()
    } else {
        const err = new Error("Drink Not Found")
        err.status = 404
        next(err)
    }
})

module.exports = router;