const express = require('express')
const {Sequelize, DataTypes} = require('sequelize')

/*сделали настройку {} связанного с бд*/
const sequelize = new Sequelize('photos', 'root', '123456', {
    dialect: "sqlite",
    host: "localhost",
    storage: '../store-db/photos.db',
    define: {
        timestamps: false
    }
});

/*массив, хранящий фото из бд*/
const photosArr = [];

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

/*создаем сервер*/
const app = express();

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

/*внедряем middleware с настройками CORS*/
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', (req, res) => {
    res.send('hello api')
});

/*передача фотографий на фронт по запросу на '/photos' в зависимости от параметров запроса*/
app.get('/photos', (req, res) => {
    let page = req.query.page;
    let limit = req.query.limit;
    if (!page) {
        page = 1
    }
    if (!limit) {
        limit = 9
    }
    if (Number(page) === 1) {
        res.send(photosArr.slice(0, limit))
    } else {
        res.send(photosArr.slice(limit * (page - 1), limit * page))
    }
});

/*передача последних фотографий*/
app.get('/latest', (req, res) => {
    res.send(photosArr.slice(-9))
});


