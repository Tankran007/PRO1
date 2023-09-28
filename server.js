const express = require ('express');
const Sequelize = require( 'sequelize');
const app = express();

// parse incoming requests
app.use (express.json());

// create a connection to the database
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: 'Database/Music_Album.db'
});

//Employee
const MusicAlbum = sequelize.define('MusicAlbum', {
    musicformat: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    music: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Composer: {
        type: Sequelize.STRING,
        allowNull: false
    }
    
});

//Department
const Musicformat = sequelize.define('Musicformat', {
    id_fom: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    musicformat: {
        type: Sequelize.STRING,
        allowNull: false
    }
    
});

const Music = sequelize.define('Music', {
    id_mus: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    music_name: {
        type: Sequelize.STRING,
        allowNull: false
    }
    
});

const Composer = sequelize.define('Composer', {
    id_com: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    composer_name: {
        type: Sequelize.STRING,
        allowNull: false
    }
    
});
sequelize.sync();
//ของ table composer
app.get('/getcom', (req, res) => {
    Composer.findAll().then(composer => {
        res.json(composer);
    }).catch(err =>{
        res.status(500).send(err);
    });
});

app.get('/getcom/:id', (req, res) => {
    Composer.findByPk(req.params.id).then(composer => {
    if (!composer) {
            res.status (404).send('composer not found');
        } else {    
            res.json(composer) ;
        }
        }).catch(err => {
            res.status(500).send(err);
        });
    });

app.post('/com',(req,res) => {
    Composer.create(req.body).then(composer => {
        res.send(composer);
    }).catch(err => {
        res.status(500).send(err);
    });

});

app.put('/getcom/:id', (req, res) => {
    Composer.findByPk( req.params.id).then(composer => {
    if (!composer) {
        res.status(404).send('composer not found');
    } else {
        composer.update(req.body).then(() => {
        res.send(composer) ;
    }).catch(err => {
        res.status(500).send(err);
    });
    }
    }).catch(err => {
        res. status(500).send(err);
    });
});

app.delete('/getcom/:id', (req, res) => {
    Composer.findByPk(req.params.id).then(composer => {
    if (!composer) {
        res.status(404).send('composer not found');
    } else {
        composer.destroy().then(() => {
        res.send({});screenY
    }).catch(err => {
        res.status (500) .send(err);
    });
    }
    }).catch(err => {
    res.status(500).send(err);
    });
    });

app.listen(5500, () => {
    console.log("Server started on port 5500");
    });