var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var itemSchema = new Schema({
  name: {type: String},
  description: {type: String},
  category: {type: Schema.ObjectId, ref: 'Category'},
  quantity: {type: Number},
  price: {type: Number},
});

itemSchema.virtual('url').get(function() {
  return `/inventory/item/${this._id}`;
});

module.exports = mongoose.model('Item', itemSchema);

