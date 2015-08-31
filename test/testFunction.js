/**
 * Created by FunkySoya on 2015/8/30.
 */

var session = require("express-session");
var redis = require("connect-redis")(session);

var test = {a:1,b:2,c:3};

for( var i in test ){
    console.log(i,test[i]);
}