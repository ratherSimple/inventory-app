var Category = require('./models/category');
var Item = require('./models/item');

var mongoose = require('mongoose');
var mongoDB = "mongodb://127.0.0.1:27017/inventory_app"
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const categories = [
  {
    name: "Sports",
    description: "Items that you can play with, or you use while playing sports"
  },
  {
    name: "Stationery",
    description: "Common items in school"
  },
  {
    name: "Video games",
    description: "Getting bored? Well not anymore!"
  },
  {
    name: "Furniture",
    description: "You are gonna need it in your house"
  }
];


function handleError(err, res) {
  if (err)
    console.log(`error occurred -> ${err}`);
}

async function getCat(name) {
  const cat = await Category.findOne({name: name}).exec();
  return cat;
}

async function populateCats() {
  console.log("about to insert cats");
  await Category.insertMany(categories);
  console.log("inserted cats!");
}



async function populateItems() {
  console.log("about to insert items");
  const items = [
    {
      name: "Cricket bat",
      description: "Played by batsperson in the game of cricket",
      quantity: 0,
      category: await getCat("Sports"),
      price: 10
    },
    {
      name: "Football",
      description: "Used in soccer",
      quantity: 0,
      category: await getCat("Sports"),
      price: 5
    },
    {
      name: "Pencil",
      description: "Used to make notes or doodle",
      quantity: 0,
      category: await getCat("Stationery"),
      price: 2
    },
    {
      name: "Eraser",
      description: "Used to erase anything written using a pencil",
      quantity: 0,
      category: await getCat("Stationery"),
      price: 2
    },
    {
      name: "Skyrim",
      description: "GOTY 2011, isn't that enough",
      quantity: 0,
      category: await getCat("Video games"),
      price: 15
    },
    {
      name: "Starfield",
      description: "Upcoming Bethesda game",
      quantity: 0,
      category: await getCat("Video games"),
      price: 15
    },
    {
      name: "Desk",
      description: "Used for keeping stuff on it",
      quantity: 0,
      category: await getCat("Furniture"),
      price: 20
    },
    {
      name: "Chair",
      description: "Used to sit on",
      quantity: 0,
      category: await getCat("Furniture"),
      price: 5
    }
  ]

  await Item.insertMany(items);
  console.log("inserted items");

}

async function populateDB() {
  await populateCats();
  console.log("done")
  await populateItems();
  mongoose.connection.close();
}

populateDB();











