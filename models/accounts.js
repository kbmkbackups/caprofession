/**
 * Created by sailfish2 on 1/1/2016.
 */
var db = require('mongoose');

var pancarddetails = db.Schema({
    pancardname:String,
    pancardtype:String,
    pancardid:String,
    versionKey:false
});

var mySchema = db.Schema({
    accountname:String,
    address:String,
    phoneno:Number,
    pancardentities:[pancarddetails],
    versionKey:false
});

var accounts = db.model('accounts',mySchema);
module.exports = accounts;