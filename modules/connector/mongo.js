
var settings = require("../../settings");
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var server = new Server(settings.mongodb_host,settings.mongodb_port,{auto_reconnect:settings.mongodb_reconnect,poolSize:settings.mongodb_poolSize})
module.exports = new Db(settings.mongodb_name,server,{safe:true});