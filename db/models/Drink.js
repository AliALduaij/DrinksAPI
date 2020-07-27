const { DataTypes, Model } = require("sequelize")
const SequelizeSlugify = require("sequelize-slugify")
const db = require("../db")

class Drink extends Model { }

Drink.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            defaultValue: 20,
            validate: {
                min: 1
            }
        },
        image: {
            type: DataTypes.STRING,

            // validate: {
            //     isUrl: true
            // }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        slug: {
            type: DataTypes.STRING,
        }
    },
    {
        sequelize: db,
    }

)

SequelizeSlugify.slugifyModel(Drink, {
    source: ['name']
});



module.exports = Drink;