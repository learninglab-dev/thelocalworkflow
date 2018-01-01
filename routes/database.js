var express = require('express');
var router = express.Router();

var shoot_controller = require('../controllers/the_database/shootController');
var person_controller = require('../controllers/the_database/personController');
var moment_controller = require('../controllers/the_database/momentController');
var segment_controller = require('../controllers/the_database/segmentController');
var database_controller = require('../controllers/the_database/databaseController');
var Person = require('../models/person');

router.get('/', database_controller.index);

router.get('/shoot/create', shoot_controller.shoot_create_get);

router.post('/shoot/create', shoot_controller.shoot_create_post);

router.get('/shoot/:id/delete', shoot_controller.shoot_delete_get);

router.post('/shoot/:id/delete', shoot_controller.shoot_delete_post);

router.get('/shoot/:id/update', shoot_controller.shoot_update_get);

router.post('/shoot/:id/update', shoot_controller.shoot_update_post);

router.get('/shoot/:id', shoot_controller.shoot_detail);

router.get('/shoots', shoot_controller.shoot_list);

router.get('/person/create', person_controller.person_create_get);

router.post('/person/create', person_controller.person_create_post);

router.get('/person/:id/delete', person_controller.person_delete_get);

router.post('/person/:id/delete', person_controller.person_delete_post);

router.get('/person/:id/update', person_controller.person_update_get);

router.post('/person/:id/update', person_controller.person_update_post);

router.get('/person/:id', person_controller.person_detail);

// router.get('/person/:id', (req, res, next)=>{
//   Person.findById(req.params.id, (err, result)=> {
//     console.log(JSON.stringify(result, null, 4));
//     res.render('database/person_detail', { title: 'Person Detail', tabTitle: 'Person Detail', thePerson: result})
//   });
// });

router.get('/people', person_controller.person_list);

router.get('/segment/create/csv', segment_controller.segment_create_csv_get);
router.get('/segment/create/manual', segment_controller.segment_create_manual_get);

router.get('/segment/create', segment_controller.segment_create_get);

router.post('/segment/create', segment_controller.segment_create_post);

router.get('/segment/:id/delete', segment_controller.segment_delete_get);

router.post('/segment/:id/delete', segment_controller.segment_delete_post);

router.get('/segment/:id/update', segment_controller.segment_update_get);

router.post('/segment/:id/update', segment_controller.segment_update_post);

router.get('/segment/:id', segment_controller.segment_detail);

router.get('/segments', segment_controller.segment_list);

router.get('/moment/create', moment_controller.moment_create_get);

router.post('/moment/create', moment_controller.moment_create_post);

router.get('/moment/:id/delete', moment_controller.moment_delete_get);

router.post('/moment/:id/delete', moment_controller.moment_delete_post);

router.get('/moment/:id/update', moment_controller.moment_update_get);

router.post('/moment/:id/update', moment_controller.moment_update_post);

router.get('/moment/:id', moment_controller.moment_detail);

router.get('/moments', moment_controller.moment_list);

module.exports = router;
