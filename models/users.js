/**
 * Created by sailfish2 on 12/31/2015.
 */
var db = require('mongoose');
var mySchema = db.Schema({
    username:String,
    password:String,
    email:String,
    versionKey:false
});

var users = db.model('users',mySchema);
module.exports = users;