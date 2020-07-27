const Drink = require("./Drink")
const Seller = require("./Seller")

Seller.hasMany(Drink, { as: "drinks", foreignKey: "sellerID", allowNull: false });
Drink.belongsTo(Seller, { as: "seller", foreignKey: "sellerID" })
module.exports = {
    Drink,
    Seller,
}

