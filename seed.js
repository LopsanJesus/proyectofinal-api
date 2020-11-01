const models = require('./database/models');

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
                    name: 'Willow',
                }, {
                    name: 'Walnut',
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