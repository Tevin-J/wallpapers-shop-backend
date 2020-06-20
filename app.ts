const express = require('express');
import {Application, Request, Response} from "express";

const cors = require('cors');
const {Sequelize, DataTypes} = require('sequelize');

/*сделали настройку {} связанного с бд*/
const sequelize = new Sequelize('photos', 'root', '123456', {
    dialect: "sqlite",
    host: "localhost",
    storage: '../store-db/photos.db',
    define: {
        timestamps: false
    }
});

interface IPhoto {
    id: number
    title: string
    description: string
    url: string
    price: number
    popularity: number
}

/*массив, хранящий фото из бд*/
const photosArr: IPhoto[] = [];

let ordersArr: IPhoto[] = [];

let promoValue: string;

/*создали модель фотографии на основе данных из бд*/
const Photo = sequelize.define('photo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    popularity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});

const Order = sequelize.define('order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    popularity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});

const Promo = sequelize.define('promo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: false
});

const jsonParser = express.json();

/*синхронизировали модель с таблицей бд*/
sequelize.sync()
    .then(() => {
        /*после синхронизации запускаем сервер*/
        app.listen(3000, () => {
            console.log('server has been started');
        })
    })
    .catch(err => console.log(err));

/*достаем все фото из бд и помещаем их в массив фотографий*/
Photo.findAll({raw: true})
    .then(photos => {
        photosArr.push(...photos)
    })
    .catch(err => console.log(err));

Order.findAll({raw: true})
    .then(orders => {
        ordersArr.push(...orders)
    })
    .catch(err => console.log(err));

const app: Application = express();
/*внедряем middleware с настройками CORS*/
app.use(cors());

app.get('/promo', jsonParser, async (req: Request, res: Response) => {
    try {
        await Promo.findAll({raw: true})
            .then(promo => {
                promoValue = promo[0].title;
            })
            .catch(err => console.log(err));
        res.json(promoValue)
    } catch (e) {
        console.log(e)
    }
});

app.put('/promo', jsonParser, async (req: Request, res: Response) => {
    try {
        await Promo.update({title: req.body.value}, {where: {id: 1}});
        let newPromo = await Promo.findAll({raw: true});
        res.json(JSON.stringify(newPromo[0].title))
    } catch (e) {
        console.log(e)
    }
});

/*передача фотографий на фронт по запросу на '/photos' в зависимости от параметров запроса*/
app.get('/photos', async (req: Request, res: Response) => {
    try {
        let page: any = req.query.page;
        let limit: any = req.query.limit;
        if (!page) {
            page = 1
        }
        if (!limit) {
            limit = 9
        }
        if (Number(page) === 1) {
            res.json(JSON.stringify(photosArr.slice(0, limit)));
        } else {
            res.json(JSON.stringify(photosArr.slice(limit * (page - 1), limit * page)))
        }
    } catch (e) {
        console.log(e)
    }

});

/*передача последних фотографий*/
app.get('/latest', async (req: Request, res: Response) => {
    try {
        await res.json(JSON.stringify(photosArr.slice(-9)))
    } catch (e) {
        console.log(e)
    }
});

app.post('/orders', jsonParser, async (req: Request, res: Response) => {
    try {
        let orders = req.body;
        let filteredArr = ordersArr;
        if (!ordersArr.length) {
            orders.forEach(order => {
                ordersArr.push(order)
            })
        } else {
            let duplicate = 0;
            for (let i = 0; i < orders.length; i++) {
                for (let j = 0; j < ordersArr.length; j++) {
                    if (orders[i].id === ordersArr[j].id) {
                        duplicate += 1
                    }
                }
                if (duplicate === 0) {
                    filteredArr.push(orders[i])
                }
            }
            ordersArr = filteredArr
        }
        await ordersArr.forEach(o => {
            Order.create({
                id: o.id,
                title: o.title,
                description: o.description,
                url: o.url,
                price: o.price,
                popularity: o.popularity
            })
        });
        res.json(JSON.stringify(ordersArr))
    } catch (e) {
        console.error(e)
    }
});

app.delete('/orders/remove/:id', jsonParser, async (req: Request, res: Response) => {
    try {
        let id = Number(req.params.id);
        await Order.destroy({where: {id: id}});
        ordersArr = await Order.findAll({raw: true});
        res.json(JSON.stringify(ordersArr))
    } catch (e) {
        console.log(e)
    }
});

app.delete('/orders/remove', jsonParser, async (req: Request, res: Response) => {
    try {
        await Order.destroy({truncate: true});
        ordersArr = await Order.findAll({raw: true});
        res.json(JSON.stringify(ordersArr))
    } catch (e) {
        console.log(e);
    }
});

app.get('/purchase', jsonParser, async (req: Request, res: Response) => {
    try {
        await setTimeout(() => {
            res.json(Math.round(Math.random()));
        }, 2000);
    } catch (e) {
        console.log(e)
    }
});
