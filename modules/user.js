/**
 * Created by FunkySoya on 2015/8/30.
 */
var Q = require('q');
var crypto = require('crypto');
var uuid = require('node-uuid');

var db = require('./connector/mongo');

exports.validUser = function(user) {
    var deferred = Q.defer();
    db.open(function(err, db) {
        db.collection('tuser',function(err, collection){
            collection.findOne(user, function (err, data) {
                if (!err) {
                    deferred.resolve(data);
                } else {
                    deferred.reject(err);
                }
                db.close(true);
            });
        });
    });
    return deferred.promise;
};

exports.addUser = function(user){
    var md5 = crypto.createHash('md5');
    user.userid = uuid.v1();
    user.password = md5.update(user.password).digest('hex');
    user.createDate = new Date();
    user.token = '';
    delete user.passwordConfirm;

    var deferred = Q.defer();
    db.open(function(err, db) {
        db.collection('tuser',function(err, collection){
            collection.insert(user, function (err, data) {
                if (!err) {
                    deferred.resolve(true);
                } else {
                    deferred.reject(err);
                }
                db.close(true);
            });
        });
    });
    return deferred.promise;
};

exports.updateToken = function(userid,token){
    var deferred = Q.defer();
    db.open(function(err, db) {
        db.collection('tuser',function(err, collection){
            collection.update({userid:userid}, {$set:{token:token}}, function (err, data) {
                if (!err) {
                    deferred.resolve(null);
                } else {
                    deferred.reject(err);
                }
                db.close(true);
            });
        });
    });
    return deferred.promise;
}
