const express = require('express');

const bodyParser = require('body-parser');

const vehicles = require('./data/vehicles');



const app = express();

const PORT = 3000;



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));



// Home - List all vehicles

app.get('/', (req, res) => {

    res.render('index', { vehicles });

});



// Show form to add a vehicle

app.get('/vehicles/new', (req, res) => {

    res.render('vehicleForm');

});



// Create a new vehicle

app.post('/vehicles', (req, res) => {

    const { vehicleName, price, image, desc, brand } = req.body;

    vehicles.push({

        id: Date.now().toString(),

        vehicleName,

        price,

        image,

        desc,

        brand

    });

    res.redirect('/');

});



// Show form to edit a vehicle

app.get('/vehicles/edit/:id', (req, res) => {

    const vehicle = vehicles.find(v => v.id === req.params.id);

    res.render('editVehicle', { vehicle });

});



// Update a vehicle

app.post('/vehicles/update/:id', (req, res) => {

    const { vehicleName, price, image, desc, brand } = req.body;

    const vehicle = vehicles.find(v => v.id === req.params.id);



    if (vehicle) {

        vehicle.vehicleName = vehicleName;

        vehicle.price = price;

        vehicle.image = image;

        vehicle.desc = desc;

        vehicle.brand = brand;

    }



    res.redirect('/');

});



// Delete a vehicle

app.post('/vehicles/delete/:id', (req, res) => {

    const index = vehicles.findIndex(v => v.id === req.params.id);

    if (index !== -1) {

        vehicles.splice(index, 1);

    }

    res.redirect('/');

});



// Start server

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});