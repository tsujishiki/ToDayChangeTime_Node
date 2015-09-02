/**
 * Created by Tech on 2015/9/2.
 */
var express = require('express');
var uuid = require('node-uuid');

var Status = require('../constant/Status');
var System = require('../constant/System');
var ReturnBody = require('../modules/ReturnBody');
var businessSer = require('../modules/business')

var router = express.Router();

router.post('/', function(req, res) {
    var business = req.body;
    var user = req.session[System.USER];
    var returnBody = new ReturnBody();

    business.businessid = uuid.v1();
    business.createDate = new Date();
    business.creator = user.userid;

    businessSer.add(business).then(function(data){
        if(data){
            returnBody.status = Status.REDIRECT;
            returnBody.redirectUrl = '/';
        }else{
            returnBody.status = Status.FAILED;
            returnBody.msg = '出错了！';
        }
        res.json(returnBody);
    });
});

module.exports = router;