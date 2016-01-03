/**
 * Created by sailfish2 on 1/1/2016.
 */
var express = require('express');
var accounts = require('../models/accounts');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    console.log('hiii find all');
    var query=req.query;
    accounts.find(query,function(err, docs) {
        if (err) return next(err);
        res.json(docs);
    });
});

router.get('/pan/vw', function(req, res, next) {

    var query=req.query.an;
    accounts.findOne({accountname:query.toString()}, function(err, account) {
        if (err) return next(err);
        //res.json(req.body);
        var arrdata = account.pancardentities;
        res.json(arrdata);
    });
});

router.get('/find/:accountname', function(req, res, next) {
    console.log('hiii find One'+req.params.accountname);
    accounts.findOne({accountname:req.params.accountname.toString() }, function(err, doc) {
        if (err) return next(err);
        res.json(doc);
    });
});


router.post('/insert', function(req, res, next) {
    console.log('hiii insert');
    var accountdata =new accounts(req.body);
    accounts.create(accountdata, function(err, doc) {
        if (err) return next(err);
        res.json(doc);
    });
});


router.post('/pan/insert/:accountname', function(req, res, next) {
   console.log('hiii find One and insert'+req.params.accountname);
    accounts.findOne({accountname:req.params.accountname.toString() }, function(err, account) {
        if (err) return next(err);
        //res.json(req.body);
       account.pancardentities.push(req.body);
        account.save();
        accounts.find(function(err, doc) {
        if (err) return next(err);
           res.json(doc);
        });
    });
});

router.delete('/:id', function(req, res, next) {
    console.log('hiii delete One'+req.params.id);
    accounts.remove({_id:req.params.id.toString() }, function(err, doc) {
        if (err) return next(err);
        accounts.find(function(err, docs) {
            if (err) return next(err);
            res.json(docs);
        });
    });
});

module.exports = router;
