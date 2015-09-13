/**
 * Created by Tech on 2015/9/2.
 */

var uuid = require('node-uuid');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tbusiness = new Schema({
    businessId : {
        type: String,
        unique: true,
        default: uuid.v1()
    },
    gameName : String,
    enName : String,
    gameTypeCode : String,
    platformCode : String,
    editionCode : String,
    price : Number,
    qualityCode : Number,
    qq : String,
    mobilePhone : String,
    maker : String,
    publisher : String,
    businessTypeCode : String,
    tradingWayCode : String,
    location : String,
    description : String,
    createDate : {
        type : Date,
        default: Date.now()
    },
    modifyDate : {
        type : Date
    },
    creator : String,
    level : Number
});

var TBusiness = mongoose.model("tbusiness",tbusiness,"tbusiness");
module.exports = TBusiness;

//var Q = require('q');
//var db = require('./connector/mongo');
//
//exports.add = function(business) {
//    var deferred = Q.defer();
//    db.open(function(err, db) {
//        db.collection('tbusiness',function(err, collection){
//            collection.insert(business, function (err, data) {
//                if (!err) {
//                    deferred.resolve(data);
//                } else {
//                    deferred.reject(err);
//                }
//                db.close();
//            });
//        });
//    });
//    return deferred.promise;
//};