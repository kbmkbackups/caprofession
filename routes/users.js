var express = require('express');
var users = require('../models/users');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('hiii find all');
  var query=req.query;
  users.find(query,function(err, docs) {
    if (err) return next(err);
     res.json(docs);
  });
});


router.post('/insert', function(req, res, next) {
  console.log('hiii insert');
  var usersdata =new users(req.body);
  users.create(usersdata, function(err, doc) {
    if (err) return next(err);
    res.json(doc);
  });
});


router.patch('/update', function(req, res, next) {
  console.log('hiii update');
  var usersdata =new users.pancardtypes[req.body];
  users.create(usersdata, function(err, doc) {
    if (err) return next(err);
    res.json(doc);
  });
});



router.get('/find/:email', function(req, res, next) {
  console.log('hiii find One'+req.params.email);
  users.findOne({email:req.params.email.toString() }, function(err, doc) {
    if (err) return next(err);
    res.json(doc.username);
  });
});

router.delete('/:id', function(req, res, next) {
  console.log('hiii delete One'+req.params.id);
  users.remove({_id:req.params.id }, function(err, doc) {
    if (err) return next(err);
    users.find(function(err, docs) {
      if (err) return next(err);
      res.json(docs);
    });
  });
});

module.exports = router;
