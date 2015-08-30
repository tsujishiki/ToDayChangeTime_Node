/**
 * Created by FunkySoya on 2015/8/30.
 */

var redis = require("../modules/connector/redis");
var util = require("util");

redis.hgetall('edition',function(errGet,responseGet){
    console.log('Val:'+util.inspect(responseGet));
});