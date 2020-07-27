const express = require("express")
const router = express.Router();

const upload = require("./multer")
const { sellerList, sellerDelete, sellerUpdate, sellerCreate, fetchSeller, drinkCreate } = require("../controllers/sellerControllers")




router.get("/", sellerList);




router.delete("/:sellerID", sellerDelete)

router.post("/", upload.single("image"), sellerCreate)
router.post("/:sellerID/drinks", upload.single("image"), drinkCreate)

router.put("/:sellerID", upload.single("image"), sellerUpdate)

router.param("sellerID", async (req, res, next, sellerID) => {
    const seller = await fetchSeller(sellerID, next)
    if (seller) {
        req.seller = seller
        next()
    } else {
        const err = new Error("Seller Not Found")
        err.status = 404
        next(err)
    }
})

module.exports = router;