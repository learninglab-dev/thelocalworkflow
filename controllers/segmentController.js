var Segment = require('../models/segment');

// Display list of all Authors
exports.segment_list = function(req, res) {
  Segment.find({})
    .exec(function (err, list_segment) {
      if (err) { return next(err); }
      //Successful, so render
      console.log(JSON.stringify(list_segment, null, 4));
      res.render('database/segmentlist', { title: 'Segment List', tabTitle: "Segment List", segment_list: list_segment });

    });
};





// Display detail page for a specific Author
exports.segment_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: segment detail: ' + req.params.id);
};

// Display Author create form on GET
exports.segment_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: segment create GET');
};

// Handle Author create on POST
exports.segment_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: segment create POST');
};

// Display Author delete form on GET
exports.segment_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: segment delete GET');
};

// Handle Author delete on POST
exports.segment_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: segment delete POST');
};

// Display Author update form on GET
exports.segment_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: segment update GET');
};

// Handle Author update on POST
exports.segment_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: segment update POST');
};