var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stockSchema = new Schema({
  ticker: String,
  dividends: String,
  region: String,
  country: String,
  location: String
});

var Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;