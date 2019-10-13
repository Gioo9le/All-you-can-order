var express = require('express');
var fs = require('fs');
var router = express.Router();

router.get('/', function(req, res, next) {
    let menuStream = fs.readFileSync('./resources/menu.json');
    //console.log(menuJSON.toString());
    var menuText = menuStream.toString()
    res.send(menuText);
});

module.exports = router;