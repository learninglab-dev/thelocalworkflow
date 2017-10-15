var Moment = require('../models/moment')
var async = require('async')

// Display list of all Authors
exports.moment_list = function(req, res, next) {
  Moment.find()
    .sort([['shootId', 'ascending']])
    .exec(function (err, list_moments) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('shootlist', { title: 'Moment List', momentlist:  list_moments});
    })

};


// Display Author create form on GET
exports.shoot_create_get = function(req, res, next) {
    res.render('momentform', { title: 'Create Author'});
};

// Handle Author create on POST
exports.moment_create = function(req, res, next) {
  console.log("made it into momentController and in the moment_create function");
    req.checkBody('shootId', 'Shoot ID must be specified.').notEmpty(); //We won't force Alphanumeric, because people might have spaces.
    req.checkBody('inPoint', 'In Point must be specified.').notEmpty();
    req.checkBody('outPoint', 'Out Point must be specified.').notEmpty();
    req.sanitize('shootId').escape();
    req.sanitize('inPoint').escape();
    req.sanitize('outPoint').escape();
    req.sanitize('shootId').trim();
    req.sanitize('inPoint').trim();
    req.sanitize('outPoint').trim();

    var errors = req.validationErrors();

    var moment = new Moment(
      {
        shootId: req.body.shootId,
        inPoint: req.body.inPoint,
        outPoint: req.body.outPoint
      });


    if (errors) {
        res.render('author_form', { title: 'Create Author', author: author, errors: errors});
    return;
    }
    else {
    // Data from form is valid

        moment.save(function (err) {
            if (err) { return next(err); }
               //successful - redirect to new author record.
              //  res.redirect(moment.url);
              res.redirect('/');
            });

    }

};
//
// // Display Author delete form on GET
// exports.author_delete_get = function(req, res, next) {
//
//     async.parallel({
//         author: function(callback) {
//             Author.findById(req.params.id).exec(callback)
//         },
//         authors_books: function(callback) {
//           Book.find({ 'author': req.params.id }).exec(callback)
//         },
//     }, function(err, results) {
//         if (err) { return next(err); }
//         //Successful, so render
//         res.render('author_delete', { title: 'Delete Author', author: results.author, author_books: results.authors_books } );
//     });
//
// };