const mongoose = require('mongoose');

const stateSchema = mongoose.Schema({
  name: String,
  capital: String,
  region: String,
});

const usState = mongoose.model('state', stateSchema);

export default usState;