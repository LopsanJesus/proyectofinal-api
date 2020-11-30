const models = require('../models');
const getSeeds = require('./seeders');


async function seedFunc(seeds) {
    for (seed of seeds) {
        console.log("\nSeeding " + seed.model + "\n");

        await createModel(seed);
    }
}

function createModel(seed) {
    return new Promise((resolve) => {
        models[seed.model].bulkCreate(seed.data).
            then((inserts) => {
                console.log("\n" + inserts.length + " " + seed.model + "s seeded\n\n");
                resolve();
            }).catch((err) => {
                console.log("Error inserting in " + seed.model);
                console.log(err);
            });
    });
}

async function main() {
    const seeders = await getSeeds();
    seedFunc(seeders);
}


main();