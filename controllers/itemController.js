Item = require('../models/item');
Category = require('../models/category');
async = require('async');


exports.item_create_get = function(req, res) {
  res.send("heres the form to create items");
}

exports.item_create_post = function(req, res) {
  res.send("create items form gets processed here");
}

exports.item_delete_get = function(req, res) {
  Item
  .findById(req.params.id)
  .populate("category")
  .exec((err, item) => {
    res.render("item_delete", {item: item});
  }) 
}

exports.item_delete_post = function(req, res) {
  Item.findByIdAndRemove(req.body.id, (err) => {
    if (err)
      return next(err);
    res.redirect(`/inventory/categories`)
  })
}

exports.item_update_get = function(req, res) {
  // res.send("heres the form to update items");
  async.parallel({
    item: function(cb) {
      Item
      .findById(req.params.id)
      .populate('category')
      .exec(cb)
    },
    categories: function(cb) {
      Category
        .find()
        .exec(cb)
    }
  }, function(err, results) {
    if (err)
      return next(err);
    res.render('item_form', {item: results.item, categories: results.categories});
    
  });
  
}

exports.item_update_post = async function(req, res, next) {
  // res.send(`update items form gets processed here ${req.body.id}`);
  let item = new Item({
    name: req.body.name,
    description: req.body.description,
    category: await Category.findOne({name: req.body.category}).exec(),
    price: req.body.price,
    quantity: req.body.quantity,
    _id: req.params.id
  })

  Item.findByIdAndUpdate(req.params.id, item, {}, function (err, updatedItem) {
    if (err) { return next(err); }
       // Successful - redirect to genre detail page.
       res.redirect(updatedItem.url);
    });

}

exports.item_list = function(req, res) {
  res.send("list of items:");
}

exports.item_detail = function(req, res) {
  Item
    .findById(req.params.id)
    .populate('category')
    .exec(function(err, item) {
      if (err)
        return next(err);
      res.render('item_detail', {item: item});
    })
}















// router.get('/item/create', item_controller.item_create_get);
// router.post('/item/create', item_controller.item_create_post);

// router.get('/item/:id/delete', item_controller.item_delete_get);
// router.post('/item/:id/delete', item_controller.item_delete_post);

// router.get('/item/:id/update', item_controller.item_update_get);
// router.post('/item/:id/update', item_controller.item_update_post);

// router.get('/items', item_controller.item_list);
// router.get('/item/:id', item_controller.item_detail);
