const { DataTypes, Model } = require("sequelize")
const db = require("../db")
const SequelizeSlugify = require("sequelize-slugify")

class Seller extends Model { }

Seller.init({

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING,
        unique: true
    },
    image: {
        type: DataTypes.STRING
    }

},
    {
        sequelize: db,
    }
)
SequelizeSlugify.slugifyModel(Seller, {
    source: ["name"]
})

module.exports = Seller