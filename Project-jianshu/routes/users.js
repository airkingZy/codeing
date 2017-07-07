var express = require('express');
var router = express.Router();
// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/Usersql');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );
// 响应一个JSON数据

var responseJSON = function (res, ret) {
    if(typeof ret === 'undefined') {
        res.json({     code:'-200',     msg: '操作失败'
        });
    } else {
        res.json(ret);
    }};
router.get('/', function(req, res, next) {
    // res.redirect('/user');
    res.render('user', { title: 'Express' });

});

// 添加用户
router.get('/addUser', function(req, res, next){
    // 从连接池获取连接
    pool.getConnection(function(err, connection) {
// 获取前台页面传过来的参数
        var param = req.query || req.params;
// 建立连接 增加一个用户信息
        connection.query(userSQL.insert, [param.uid,param.name], function(err, result) {
            if(result) {
                req.session.uid=param.uid;
                result = {
                    code: 200,
                    msg:'增加成功',
                    result:result
                };
                // responseJSON(res, result);
                //要跳转就不能传数据，用session临时追踪用户
                // res.redirect('user');
            }

            // 以json形式，把操作结果返回给前台页面
            responseJSON(res, result);

            // 释放连接
            connection.release();

        });
    });
});

router.get('/query',function (req,res,next) {
    pool.getConnection(function (err,connection) {
        var param = req.query || req.params;
        var queryid = req.session.uid;
        connection.query(userSQL.getUserById, queryid, function(err, result) {
            if(result) {
                result = {
                    code: 200,
                    msg:'查询成功',
                    result:result
                };
            }

            // 以json形式，把操作结果返回给前台页面
            responseJSON(res, result);
            console.log(result)

            // 释放连接
            connection.release();

        });

    });
});

module.exports = router;