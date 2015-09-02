/**
 * Created by Tech on 2015/9/2.
 */

var Q = require('q');

var db = require('./connector/mongo');

exports.add = function(business) {
    var deferred = Q.defer();
    db.open(function(err, db) {
        db.collection('tbusiness',function(err, collection){
            collection.insert(business, function (err, data) {
                if (!err) {
                    deferred.resolve(data);
                } else {
                    deferred.reject(err);
                }
                db.close();
            });
        });
    });
    return deferred.promise;
};