const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const listItemsController = require('./controllers/ListItemsController.js')

app.use(express.static('build'));

mongoose.connect('mongodb://paul:codesmith@ds139960.mlab.com:39960/music-profile');
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile('login.html');
});
//route for login
app.get('/', (req, res) => {
  res.redirect('process.env.BACKEND_URI || "http://localhost:8888"');
})

app.get('/allSets', listItemsController.getExistingSetlist);
app.get('/playLists', listItemsController.getExistingPlaylist);
app.get('/albums', listItemsController.getExistingAlbums);

app.post('/add', listItemsController.addItem);

app.delete('/', listItemsController.deleteItem);

app.listen(process.env.PORT || 3000, () => console.log('Listening on port 3000'));
