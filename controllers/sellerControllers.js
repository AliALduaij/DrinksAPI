const { Seller, Drink } = require("../db/models")



exports.fetchSeller = async (sellerID, next) => {
    try {
        const foundSeller = await Seller.findByPk(sellerID)
        return foundSeller
    } catch (error) {
        next(error)
    }

}


exports.sellerCreate = async (req, res, next) => {

    try {
        if (req.file) {
            req.body.image = `${req.protocol}://${req.get("host")}/media/${
                req.file.filename
                }`;
        }
        const newSeller = await Seller.create(req.body)
        res.status(201).json(newSeller)
    } catch (error) {
        next(error)
    }
}

exports.drinkCreate = async (req, res, next) => {

    try {

        if (req.file) {
            req.body.image = `${req.protocol}://${req.get("host")}/media/${
                req.file.filename
                }`;
        }
        req.body.sellerID = req.seller.id
        console.log("sellerID", req.body)
        const newDrink = await Drink.create(req.body)
        res.status(201).json(newDrink)
    } catch (error) {
        next(error)
    }
}

exports.sellerUpdate = async (req, res) => {

    try {
        if (req.file) {
            req.body.image = `${req.protocol}://${req.get("host")}/media/${req.file.filename}`
        }
        await req.seller.update(req.body)
        res.status(204).end()
    } catch (err) {
        next(error)
    }

}

exports.sellerDelete = async (req, res, next) => {


    try {
        await req.seller.destroy()
        res.status(204).end()
    } catch (err) {
        next(error)
    }





}

exports.sellerList = async (req, res) => {
    try {
        const sellers = await Seller.findAll({
            attributes: ["id", "name"],
            include: {
                model: Drink,
                as: "drinks",
                attributes: { exclude: ["createdAt", "updatedAt"] }
            }
        })
        res.json(sellers);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}



