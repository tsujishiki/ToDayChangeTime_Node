/**
 * Created by FunkySoya on 2015/8/30.
 */

var session = require("express-session");
var redis = require("connect-redis")(session);
var System = require('../modules/system');
var settings = require('../settings');

var test = {a:1,b:2,c:3};

for( var i in test ){
    console.log(i,test[i]);
}

console.log(System.decrypt('3855f33a3dffacb2590aa8df7163ed8055aaf188b53d45b1151f91580ba9719626ad626435a44ad2f188fed82f22262b99c83998ea63f1fa60ed958baff4bd017207471e82325fde',settings.app_secret_key));