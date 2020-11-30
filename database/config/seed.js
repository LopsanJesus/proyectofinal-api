const models = require('../models');
const bcrypt = require('bcryptjs');

const seeds =
    [
        {
            model: 'Language',
            data: [
                {
                    name: 'Español',
                    code: 'ES',
                },
                {
                    name: 'Inglés',
                    code: 'EN',
                },
                {
                    name: 'Alemán',
                    code: 'DE',
                }
            ]
        },
        {
            model: 'User',
            data: [
                {
                    name: 'John Doe',
                    email: 'johndoe@johndoe.com',
                    password: await bcrypt.hash('john', 10)
                },
                {
                    name: 'Jesus',
                    email: 'suspezchez@gmail.com',
                    password: await bcrypt.hash('jesus', 10)
                },
                {
                    name: 'María',
                    email: 'maria10@gmail.com',
                    password: await bcrypt.hash('maria', 10)
                },
            ]
        },
        {
            model: 'Tree',
            data: [
                {
                    name: 'B1 Alemán',
                    owner: 2,
                    sourceLang: 1,
                    targetLang: 3,
                },
                {
                    name: 'B1 Inglés',
                    owner: 1,
                    sourceLang: 1,
                    targetLang: 2,
                }
            ]
        },
        {
            model: 'Branch',
            data: [
                {
                    name: 'Verbos separables',
                    treeId: 1,
                },
                {
                    name: 'Verbos irregulares',
                    treeId: 1,
                },
                {
                    name: 'Verbos regulares',
                    treeId: 1,
                },
                {
                    name: 'Colores',
                    treeId: 2,
                },
                {
                    name: 'Profesiones',
                    treeId: 2,
                },
            ]
        },
        {
            model: 'Leaf',
            data: [
                {
                    name: 'Leer',
                    translation: 'Read',
                    branchId: 1,
                },
                {
                    name: 'Cantar',
                    translation: 'Sing',
                    branchId: 1,
                },
                {
                    name: 'Entender',
                    translation: 'Understand',
                    branchId: 2,
                },
            ]
        },
        {
            model: 'ImportedTree',
            data: [
                {
                    customName: 'Mi arbol importado',
                    treeId: 1,
                    userId: 1,
                }, {
                    customName: 'Mi arbol importado 2',
                    treeId: 1,
                    userId: 2,
                }, {
                    customName: 'Mi arbol',
                    treeId: 2,
                    userId: 2,
                }
            ]
        },
        {
            model: 'Test',
            data: [
                {
                    numberOfLeaves: 20,
                    score: 15,
                    importedTreeId: 1,
                }, {
                    numberOfLeaves: 20,
                    score: 0,
                    importedTreeId: 1,
                }, {
                    numberOfLeaves: 13,
                    score: 7,
                    importedTreeId: 2,
                }, {
                    numberOfLeaves: 2,
                    score: 1,
                    importedTreeId: 1
                }
            ]
        },
        {
            model: 'LeafRecord',
            data: [
                {
                    attempts: 20,
                    hits: 13,
                    isApple: false,
                    importedTreeId: 1,
                    leafId: 2,
                }, {
                    attempts: 3,
                    hits: 2,
                    isApple: false,
                    importedTreeId: 1,
                    leafId: 2,
                }, {
                    attempts: 6,
                    hits: 6,
                    isApple: true,
                    importedTreeId: 2,
                    leafId: 1,
                }, {
                    attempts: 9,
                    hits: 0,
                    isApple: false,
                    importedTreeId: 2,
                    leafId: 1,
                }
            ]
        },
    ];

const cleanAndSeed = (seeds) => {
    seeds.forEach(seed => {
        models[seed.model].destroy({
            where: {}
        });

        models[seed.model].bulkCreate(seed.data).
            then((inserts) => {
                console.log(inserts.length + " " + seed.model + "s seeded");
            }).catch((err) => {
                console.log("Error inserting in " + seed.model);
            });
    });
};

cleanAndSeed(seeds);