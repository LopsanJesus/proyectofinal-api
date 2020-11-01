const models = require('../models');

const seeds =
    [
        {
            model: 'User',
            data: [
                {
                    name: 'John Doe',
                    email: 'johndoe@johndoe.com',
                    password: 'john'
                }, {
                    name: 'John Doe3',
                    email: 'johndoe@johndoe.com',
                    password: 'john'
                }
            ]
        },
        {
            model: 'Tree',
            data: [
                {
                    name: 'B1 Alemán',
                }, {
                    name: 'B1 Inglés',
                }
            ]
        },
        {
            model: 'Language',
            data: [
                {
                    name: 'Español',
                    code: 'ES',
                },{
                    name: 'Inglés',
                    code: 'EN',
                },{
                    name: 'Alemán',
                    code: 'DE',
                }
            ]
        },
    ];

const cleanAndSeed = (seeds) => {
    seeds.forEach(seed => {
        models[seed.model].destroy({
            where: {}
        });

        models[seed.model].bulkCreate(seed.data).then((inserts) => {
            console.log(inserts.length + " " + seed.model + "s seeded");
        }).catch((err) => {
            console.log("Error inserting in " + seed.model);
        });
    });
};

cleanAndSeed(seeds);