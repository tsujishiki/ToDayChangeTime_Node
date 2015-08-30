/**
 * Created by FunkySoya on 2015/8/30.
 */

var express = require('express');
var router = express.Router();

router.get('/:dir', function(req, res) {
    res.sendfile('./templates/'+req.params.dir + '.html');
});

router.get('/business/:dir', function(req, res) {
    res.sendfile('./templates/business/'+req.params.dir + '.html');
});

module.exports = router;