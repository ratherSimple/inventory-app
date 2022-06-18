var Category = require('../models/category');
var Item = require('../models/item');
var async = require('async');


exports.index = function(req, res) {
  res.render('index')
};

exports.category_create_get = function(req, res) {
  res.send("heres the form to create categories");
}

exports.category_create_post = function(req, res) {
  res.send("create categories form gets processed here");
}

exports.category_delete_get = function(req, res) {
  res.send("heres the form to delete categories");
}

exports.category_delete_post = function(req, res) {
  res.send("create categories form gets processed here");
}

exports.category_update_get = function(req, res) {
  res.send("heres the form to update categories");
}

exports.category_update_post = function(req, res) {
  res.send("update categories form gets processed here");
}

exports.category_list = function(req, res) {
  Category.find({}).exec( (err, list_categories) => {
    if (err)
      console.log(err);
    else
      res.render('category_list', {categories: list_categories});
  })
}

exports.category_detail = function(req, res, next) {
  async.parallel({
    cat: function(cb) {
      Category
        .findById(req.params.id)
        .exec(cb);
    },
    items: function(cb) {
      Item
        .find({category: req.params.id})
        .exec(cb);
    }
  },
    function(err, results) {
      if (err) {
        next(err);
      } else {
        res.render('category_detail', {cat: results.cat, items: results.items});
      }
    }
  );

}












// router.get('/categories', category_controller.category_list);
// router.get('/category/:id', category_controller.category_detail);