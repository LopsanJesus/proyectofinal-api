const bcrypt = require("bcryptjs");
const genHashedPassword = async (password) => bcrypt.hash(password, 10);

const addBranchId = (leaves, branchId) => {
  return leaves.map((leaf) => ({
    ...leaf,
    branchId: branchId,
  }));
};

var leafSeeders = [];

var normalizedPath = require("path").join(__dirname, "leafSeeders");

require("fs")
  .readdirSync(normalizedPath)
  .forEach(function (file) {
    const leaves = require("./leafSeeders/" + file);
    leafSeeders = [
      ...leafSeeders,
      ...addBranchId(leaves, parseInt(file.slice(0, file.indexOf("-")))),
    ];
  });

const getSeeds = async () => [
  {
    model: "Language",
    data: [
      {
        code: "es",
      },
      {
        code: "en",
      },
      {
        code: "fr",
      },
      {
        code: "it",
      },
      {
        code: "de",
      },
    ],
  },
  {
    model: "User",
    data: [
      {
        name: "test@e2e.com",
        email: "test@e2e.com",
        password: await genHashedPassword("treelang"),
      },
      {
        name: "Jesus",
        email: "suspezchez@gmail.com",
        password: await genHashedPassword("treelang"),
      },
      {
        name: "John Doe",
        email: "johndoe@yahoo.com",
        password: await genHashedPassword("treelang"),
      },
      {
        name: "Maria",
        email: "maria10@gmail.com",
        password: await genHashedPassword("treelang"),
      },
      {
        name: "Eva",
        email: "evatl@gmail.com",
        password: await genHashedPassword("treelang"),
      },
      {
        name: "Robert",
        email: "imrobertsmith@gmail.com",
        password: await genHashedPassword("treelang"),
      },
    ],
  },
  {
    model: "Tree",
    data: [
      {
        name: "Verbos en Alemán",
        owner: 4,
        sourceLang: 1,
        targetLang: 5,
      },
      {
        name: "Vocabulario general",
        owner: 4,
        sourceLang: 1,
        targetLang: 5,
      },
      {
        name: "Basic Vocabulary",
        owner: 6,
        sourceLang: 2,
        targetLang: 3,
      },
      {
        name: "B1: Vocabulario",
        owner: 2,
        sourceLang: 1,
        targetLang: 2,
      },
      {
        name: "Mon vocabulaire français",
        owner: 5,
        sourceLang: 1,
        targetLang: 3,
      },
    ],
  },
  {
    model: "ImportedTree",
    data: [
      {
        customName: "Verbos en Alemán",
        treeId: 1,
        userId: 4,
      },
      {
        customName: "Vocabulario general",
        treeId: 2,
        userId: 4,
      },
      {
        customName: "Basic Vocabulary",
        treeId: 3,
        userId: 6,
      },
      {
        customName: "B1: Vocabulario",
        treeId: 4,
        userId: 2,
      },
      {
        customName: "Mon vocabulaire français",
        treeId: 5,
        userId: 5,
      },
      {
        customName: "Verbos en Alemán",
        treeId: 1,
        userId: 2,
      },
      {
        customName: "Vocabulario general",
        treeId: 2,
        userId: 2,
      },
      {
        customName: "Basic Vocabulary",
        treeId: 3,
        userId: 2,
      },
      {
        customName: "Mon vocabulaire français",
        treeId: 5,
        userId: 2,
      },
    ],
  },
  {
    model: "Branch",
    data: [
      {
        name: "Verbos más frecuentes",
        treeId: 1,
      },
      {
        name: "Verbos separables",
        treeId: 1,
      },
      {
        name: "Verbos con preposición (acusativo)",
        treeId: 1,
      },
      {
        name: "Verbos con preposición (dativo)",
        treeId: 1,
      },
      {
        name: "Verbos modales",
        treeId: 1,
      },
      {
        name: "Profesiones",
        treeId: 2,
      },
      {
        name: "Colores",
        treeId: 2,
      },
      {
        name: "Partes del Cuerpo",
        treeId: 2,
      },
      {
        name: "Comida",
        treeId: 2,
      },
      {
        name: "Familia",
        treeId: 2,
      },
      {
        name: "Animales",
        treeId: 2,
      },
      {
        name: "Partes de la Casa",
        treeId: 2,
      },
      {
        name: "Ropa",
        treeId: 2,
      },
      {
        name: "Basics",
        treeId: 3,
      },
      {
        name: "Greetings",
        treeId: 3,
      },
      {
        name: "Ordinal Numbers",
        treeId: 3,
      },
      {
        name: "Cardinal Numbers",
        treeId: 3,
      },
      {
        name: "Colours",
        treeId: 3,
      },
      {
        name: "Educación",
        treeId: 4,
      },
      {
        name: "Viajes",
        treeId: 4,
      },
      {
        name: "Trabajo",
        treeId: 4,
      },
      {
        name: "Vacaciones",
        treeId: 4,
      },
      {
        name: "Tiempo Libre",
        treeId: 4,
      },
      {
        name: "Salud",
        treeId: 4,
      },
      {
        name: "Transporte",
        treeId: 4,
      },
      {
        name: "Deportes",
        treeId: 4,
      },
      {
        name: "Vida cotidiana",
        treeId: 4,
      },
      {
        name: "La Familia",
        treeId: 5,
      },
      {
        name: "Los vegetales",
        treeId: 5,
      },
      {
        name: "Las frutas",
        treeId: 5,
      },
      {
        name: "Los animales",
        treeId: 5,
      },
    ],
  },
  {
    model: "Leaf",
    data: leafSeeders,
  },
  {
    model: "Test",
    data: [],
  },
  {
    model: "LeafRecord",
    data: [],
  },
];

module.exports = getSeeds;
