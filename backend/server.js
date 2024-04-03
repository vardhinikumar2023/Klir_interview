const port = 3001;
const express = require('express')
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const database = {
    customers: [
        { id: 1, name: "Las Vegas Water", employees: 3200, contactInfo: { name: "Luke Skywalker", email: "luke@lasvegaswaters.com" }},
        { id: 2, name: "Los Angels Water", employees: 5050, contactInfo: { name: "Anakin Skywalker", email: "anakin@losangelswaters.com" }},
        { id: 3, name: "San Francisco's Water", employees: 40, contactInfo: { name: "Han Solo", email: "hansolo@sanfranciscowaters.com" }},
        { id: 4, name: "New York's Water", employees: 9053, contactInfo: { email: "leiaskywalker@newyorkwaters.com" }},
        { id: 5, name: "Miami's Water", employees: 2450, contactInfo: { name: "Mace Windu", email: "macewindu@miamiwaters.com" }},
        { id: 6, name: "Chicago's Water", employees: 1107, contactInfo: { name: "Qui-Gon Jinn", email: "quigon@chicagowaters.com" }},
        { id: 7, name: "Denver's Water", employees: 1507 }
    ]
};

const getSize = (customer) => {
    return customer.employees <= 2500 ? "Small" : customer.employees < 2500 ? "Medium" : "Big";
}

app.post('/', (req, res) => {
    const name = req.body.name;
    const response = {
        name, 
        timestamp: (new Date()).toDateString(),
        customers: database.customers.map(customer => {
            customer.size = getSize(customer)
            return customer;
        })
    };
    res.set('Access-Control-Allow-Origin', '*')
    return res.json(response);
});

app.listen(port, () => console.log(`Backend app listening on port ${port}!`))