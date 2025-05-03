

//app.use(express.static(path.join(__dirname,"static")));
//app.use('/',require(path.join(__dirname,'routes/blog.js')));
// app.get('/', function(req, res){
//    res.sendFile(path.join(__dirname,'index.html'));
// });

// app.get('/about', function(req, res){
//     res.json({'name':'Angel'});
//  });
//const inventoryRoutes = require('./routes/inventory');

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const inventoryRoutes = require('./routes/inventory');
const Inventory = require('./models/inventoryModel');

const app = express();

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/inventoryDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("DB Connection Error:", err));

// Render EJS page and fetch inventory items
app.get('/', async (req, res) => {
    try {
        const items = await Inventory.find();
        res.render('index', { items });
    } catch (err) {
        res.status(500).send("Error loading data");
    }
});

// Use Inventory API routes
app.use('/inventory', inventoryRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
