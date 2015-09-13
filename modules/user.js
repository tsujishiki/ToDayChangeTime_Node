/**
 * Created by FunkySoya on 2015/8/30.
 */
var uuid = require('node-uuid');

//var crypto = require('crypto');
//var db = require('./connector/mongo');
//var Q = require('q');
//var mongodb = require('mongodb');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tuser = new Schema({
    userid : {
        type: String,
        unique: true,
        default: uuid.v1()
    },
    userName : String,
    nickName : String,
    password : String,
    qq : String,
    createDate : {
        type : Date,
        default: Date.now()
    },
    token : String
})

var TUser = mongoose.model("tuser",tuser,"tuser");
module.exports = TUser;

//tuser.statics.validUser = function(user){
//    var deferred = Q.defer();
//    this.model("tuser").find(user, function(error, result){
//        if (!error) {
//            deferred.resolve(result);
//        } else {
//            deferred.reject(error);
//        }
//    });
//
//    return deferred.promise;
//};
//
//tuser.statics.addUser = function(user){
//    var md5 = crypto.createHash('md5');
//    user.userid = uuid.v1();
//    user.password = md5.update(user.password).digest('hex');
//    user.createDate = new Date();
//    user.token = '';
//    delete user.passwordConfirm;
//
//    var deferred = Q.defer();
//
//    this.model("tuser").save(user,function(error,resutl){
//        if (!error) {
//            deferred.resolve(result);
//        } else {
//            deferred.reject(error);
//        }
//    })
//
//    return deferred.promise;
//}
//
//tuser.statics.updateToken = function(userid,token){
//    var deferred = Q.defer();
//    this.model("tuser").update({userid:userid}, {$set:{token:token}}, function (err, data) {
//        if (!err) {
//            deferred.resolve(null);
//        } else {
//            deferred.reject(err);
//        }
//        db.close(true);
//    });
//    return deferred.promise;
//}

//exports.validUser = function(user) {
//    var deferred = Q.defer();
//    //mongodb.connect('mongodb://localhost:27017/tdct',function(err,conn){
//    //    conn.collection('tuser',function(err,coll){
//    //        coll.findOne(user,(function(err,data){
//    //            if (!err) {
//    //                deferred.resolve(data);
//    //            } else {
//    //                conn.close();
//    //                deferred.reject(err);
//    //            }
//    //            conn.close();
//    //        }));
//    //    })
//    //})
//    console.log(1);
//    db.open(function(err, db) {
//        db.collection('tuser',function(err, collection){
//            collection.findOne(user, function (err, data) {
//                console.log(1.1);
//                if (!err) {
//                    deferred.resolve(data);
//                } else {
//                    db.close();
//                    deferred.reject(err);
//                }
//            });
//        });
//    });
//    return deferred.promise;
//};
//
//exports.addUser = function(user){
//    console.log(2);
//    var md5 = crypto.createHash('md5');
//    user.userid = uuid.v1();
//    user.password = md5.update(user.password).digest('hex');
//    user.createDate = new Date();
//    user.token = '';
//    delete user.passwordConfirm;
//
//    var deferred = Q.defer();
//    db.open(function(err, db) {
//        db.collection('tuser',function(err, collection){
//            collection.insert(user, function (err, data) {
//                console.log(2.1);
//                if (!err) {
//                    deferred.resolve(true);
//                } else {
//                    deferred.reject(err);
//                }
//                db.close(true);
//            });
//        });
//    });
//    return deferred.promise;
//};
//
//exports.updateToken = function(userid,token){
//    var deferred = Q.defer();
//    db.open(function(err, db) {
//        db.collection('tuser',function(err, collection){
//            collection.update({userid:userid}, {$set:{token:token}}, function (err, data) {
//                if (!err) {
//                    deferred.resolve(null);
//                } else {
//                    deferred.reject(err);
//                }
//                db.close(true);
//            });
//        });
//    });
//    return deferred.promise;
//}