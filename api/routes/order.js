var express = require('express');
var fs = require('fs');
var router = express.Router();

var tables = new Map();

router.post('/', function(req, res, next) {
    console.log('Incoming request');
    var orderUpdate = req.body;
    if(!tables.has(orderUpdate.table)){
        tables.set(orderUpdate.table, {
            orderComplete: new Array(100),
            usersOrder : new Map(),
            orderCompleteByUser : new Array(100),
        })
    }

    usersOrder = tables.get(orderUpdate.table).usersOrder;
    orderComplete = tables.get(orderUpdate.table).orderComplete;
    orderCompleteByUser = tables.get(orderUpdate.table).orderCompleteByUser;

    console.log(orderUpdate.user);
    usersOrder.set(orderUpdate.user, orderUpdate.items);
    orderComplete.fill(0);
    for( var value of usersOrder.values()){
        for (let i = 0; i < orderComplete.length; i++) {
            orderComplete[i] = orderComplete[i] + value[i];
        }
    }
    console.log(orderComplete.map((item, idx) => {
        return [item, idx];
    }).filter((item) => {
        return item[0]>0;
    }));


    for (let i = 0; i < orderCompleteByUser.length; i++) {
        orderCompleteByUser[i] = [];
    }
    for( var [key, val] of usersOrder) {
        for (let i = 0; i < orderCompleteByUser.length; i++) {
            if (val[i] > 0) {
                orderCompleteByUser[i].push([key, val[i]])
            }
        }
    }
    console.log(orderCompleteByUser);

    resAssembled = {
        complete: orderComplete,
        byUser: orderCompleteByUser,
    };
    res.json(resAssembled);
});

router.post('/userMenu/', function(req, res, next){
    console.log(req.body.user);
    let user = req.body.user;
    let table = req.body.table;
    if(tables.has(table)){
        usersOrder = tables.get(table).usersOrder;
    }else{
        let ret = new Array(100);
        ret.fill(0);
        res.json(ret);
    }
    console.log(usersOrder.has(user));
    if(usersOrder.has(user)){
        console.log("Found");
        res.json(usersOrder.get(user));
    }else{
        let ret = new Array(100);
        ret.fill(0);
        res.json(ret);
    }
});

module.exports = router;