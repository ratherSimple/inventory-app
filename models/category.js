var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var categorySchema = new Schema({
  name: String,
  description: String
});

categorySchema.virtual('url').get(function() {
  return `/inventory/category/${this._id}`;
});

module.exports = mongoose.model('Category', categorySchema);

