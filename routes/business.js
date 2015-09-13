/**
 * Created by Tech on 2015/9/2.
 */
var express = require('express');
var uuid = require('node-uuid');

var Constant = require('../constant/Constant');
var ReturnBody = require('../modules/ReturnBody');
var TBusiness = require('../modules/business');

var router = express.Router();

router.post('/', function(req, res) {
    var business = req.body;
    var user = req.session[Constant.Session_Key.USER];
    var returnBody = new ReturnBody();

    business.businessid = uuid.v1();
    business.createDate = new Date();
    business.creator = user.userid;

    TBusiness.create(business,function(error,data){
        if(data){
            returnBody.status = Constant.Status.REDIRECT;
            returnBody.redirectUrl = '/';
        }else{
            returnBody.status = Constant.Status.FAILED;
            returnBody.msg = '出错了！';
        }
        res.json(returnBody);
    });
});

module.exports = router;