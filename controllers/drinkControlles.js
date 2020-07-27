
const { Drink, Seller } = require("../db/models")



exports.fetchDrink = async (drinkID, next) => {
    try {
        const foundDrink = await Drink.findByPk(drinkID)
        return foundDrink
    } catch (error) {
        next(error)
    }

}




exports.drinkUpdate = async (req, res) => {
    // const { drinkID } = req.params;
    // try {
    //     const foundDrink = await this.fetchDrink(drinkID, next)
    //     if (foundDrink) {
    //         await foundDrink.update(req.body)
    //         res.status(204).end()
    //     } else {
    //         res.status(404).json({ message: "Drink not found" });
    //     }

    // } catch (error) {
    //     res.status(500).json({ message: error.message })
    // }
    try {
        if (req.file) {
            req.body.image = `${req.protocol}://${req.get("host")}/media/${req.file.filename}`
        }
        await req.drink.update(req.body)
        res.status(204).end()
    } catch (err) {
        next(error)
    }

}

exports.drinkDelete = async (req, res, next) => {
    // const { drinkID } = req.params;
    // try {
    //     const foundDrink = await this.fetchDrink(drinkID, next)
    //     if (foundDrink) {
    //         await foundDrink.destroy()
    //         res.status(204).end()
    //     } else {
    //         res.status(404).json({ message: "Drink not Found" })
    //     }
    // } catch (error) {
    //     res.status(500).json({ message: error.message })
    // }

    try {
        await req.drink.destroy()
        res.status(204).end()
    } catch (err) {
        next(error)
    }





}

exports.drinkList = async (req, res) => {
    try {
        const drinks = await Drink.findAll({
            attributes: { exclude: ["sellerID", "createdAt", "updatedAt"] },
            include: {
                model: Seller,
                as: "seller",
                attributes: ["name"],

            }
        })
        res.json(drinks);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}



