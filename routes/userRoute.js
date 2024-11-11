const express = require('express');
const { fetch, create, update, deleteUser } = require('../controller/userController.js');

const route = express.Router();

route.get('/', (req, res) => res.send('Welcome NODE-JS'));
route.get('/getAllUsers', fetch);
route.post('/create', create);
route.put('/update/:id', update);
route.delete('/delete/:id', deleteUser);

module.exports = route;
