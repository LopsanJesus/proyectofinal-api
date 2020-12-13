const bcrypt = require('bcryptjs');
const genHashedPassword = async (password) => bcrypt.hash(password, 10);

const getSeeds = async () => (
    [
        {
            model: 'Language',
            data: [
                {
                    name: 'Español',
                    code: 'es',
                },
                {
                    name: 'Inglés',
                    code: 'en',
                },
                {
                    name: 'Francés',
                    code: 'fr',
                },
                {
                    name: 'Italiano',
                    code: 'it',
                },
                {
                    name: 'Alemán',
                    code: 'de',
                }
            ]
        },
        {
            model: 'User',
            data: [
                {
                    name: 'test@e2e.com',
                    email: 'test@e2e.com',
                    password: await genHashedPassword('treelang')
                },
                {
                    name: 'Jesus',
                    email: 'suspezchez@gmail.com',
                    password: await genHashedPassword('treelang')
                },
                {
                    name: 'Juan Doe',
                    email: 'juandoe@juandoe.com',
                    password: await genHashedPassword('treelang')
                },
                {
                    name: 'María',
                    email: 'maria10@gmail.com',
                    password: await genHashedPassword('treelang')
                },
                {
                    name: 'Lucía',
                    email: 'lucia@gmail.com',
                    password: await genHashedPassword('treelang')
                },
            ]
        },
        {
            model: 'Tree',
            data: [
                {
                    name: 'A2: Alemán',
                    owner: 2,
                    sourceLang: 1,
                    targetLang: 5,
                },
                {
                    name: 'B1: Vocabulario',
                    owner: 2,
                    sourceLang: 1,
                    targetLang: 2,
                }
            ]
        },
        {
            model: 'Branch',
            data: [
                {
                    name: 'Verbos regulares',
                    treeId: 1,
                },
                {
                    name: 'Verbos separables',
                    treeId: 1,
                },
                {
                    name: 'Verbos modales',
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
                    name: 'responder',
                    translation: 'antworten',
                    branchId: 1,
                },
                {
                    name: 'trabajar',
                    translation: 'arbeiten',
                    branchId: 1,
                },
                {
                    name: 'preguntar',
                    translation: 'fragen',
                    branchId: 1,
                },
                {
                    name: 'creer',
                    translation: 'glauben',
                    branchId: 1,
                },
                {
                    name: 'vivir',
                    translation: 'leben',
                    branchId: 1,
                },
                {
                    name: 'aprender',
                    translation: 'lernen',
                    branchId: 1,
                },
                {
                    name: 'hacer',
                    translation: 'machen',
                    branchId: 1,
                },
                {
                    name: 'hablar',
                    translation: 'reden',
                    branchId: 1,
                },
                {
                    name: 'decir',
                    translation: 'sagen',
                    branchId: 1,
                },
                {
                    name: 'jugar',
                    translation: 'spielen',
                    branchId: 1,
                },
                {
                    name: 'construir',
                    translation: 'bauen',
                    branchId: 1,
                },
                {
                    name: 'desarrollar',
                    translation: 'entwickeln',
                    branchId: 1,
                },
                {
                    name: 'seguir',
                    translation: 'folgen',
                    branchId: 1,
                },
                {
                    name: 'bailar',
                    translation: 'tanzen',
                    branchId: 1,
                },
                {
                    name: 'cancelar',
                    translation: 'absagen',
                    branchId: 2,
                },
                {
                    name: 'guiar',
                    translation: 'anleiten',
                    branchId: 2,
                },
                {
                    name: 'llegar',
                    translation: 'ankommen',
                    branchId: 2,
                },
                {
                    name: 'ofrecer',
                    translation: 'anbieten',
                    branchId: 2,
                },
                {
                    name: 'detener',
                    translation: 'anhalten',
                    branchId: 2,
                },
                {
                    name: 'invitar',
                    translation: 'einladen',
                    branchId: 2,
                },
                {
                    name: 'ser',
                    translation: 'sein',
                    branchId: 3,
                },
                {
                    name: 'tener',
                    translation: 'haben',
                    branchId: 3,
                },
                {
                    name: 'llegar a ser',
                    translation: 'werden',
                    branchId: 3,
                },
                {
                    name: 'poder (permiso)',
                    translation: 'dürfen',
                    branchId: 3,
                },
                {
                    name: 'poder (capacidad)',
                    translation: 'können',
                    branchId: 3,
                },
                {
                    name: 'gustar',
                    translation: 'mögen',
                    branchId: 3,
                },
                {
                    name: 'deber (obligación)',
                    translation: 'müssen',
                    branchId: 3,
                },
                {
                    name: 'deber (norma)',
                    translation: 'sollen',
                    branchId: 3,
                },
                {
                    name: 'querer',
                    translation: 'wollen',
                    branchId: 3,
                },
                {
                    name: 'actriz',
                    translation: 'actress',
                    branchId: 4,
                },
                {
                    name: 'panadero',
                    translation: 'baker',
                    branchId: 4,
                },
                {
                    name: 'diseñador',
                    translation: 'designer',
                    branchId: 4,
                },
                {
                    name: 'ingeniero',
                    translation: 'engineer',
                    branchId: 4,
                },
                {
                    name: 'jardinero',
                    translation: 'gardener',
                    branchId: 4,
                },
                {
                    name: 'fontanero',
                    translation: 'plumber',
                    branchId: 4,
                },
                {
                    name: 'enfermero',
                    translation: 'nurse',
                    branchId: 4,
                },
                {
                    name: 'político',
                    translation: 'politician',
                    branchId: 4,
                },
                {
                    name: 'taxista',
                    translation: 'taxi driver',
                    branchId: 4,
                },
                {
                    name: 'teacher',
                    translation: 'maestro',
                    branchId: 4,
                },
                {
                    name: 'dorado',
                    translation: 'golden',
                    branchId: 5,
                },
                {
                    name: 'gris',
                    translation: 'grey',
                    branchId: 5,
                },
                {
                    name: 'turquesa',
                    translation: 'turquoise',
                    branchId: 5,
                },
                {
                    name: 'rojo',
                    translation: 'red',
                    branchId: 5,
                },
                {
                    name: 'negro',
                    translation: 'black',
                    branchId: 5,
                },
            ]
        },
        {
            model: 'ImportedTree',
            data: [
                {
                    customName: 'A2: Alemán',
                    treeId: 1,
                    userId: 2,
                },
                {
                    customName: 'B1: Vocabulario',
                    treeId: 2,
                    userId: 2,
                },
            ]
        },
        {
            model: 'Test',
            data: []
        },
        {
            model: 'LeafRecord',
            data: []
        },
    ]);

module.exports = getSeeds;