var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/usersql');
var conSQL = require('../db/consql');
var likeSQL = require('../db/likesql');

var upload = require('../db/fileuploads');
// var currFilePath = path.join(dir,name);

router.get('/test', function(req, res, next) {
    res.render('uploadtest', { title: 'Express' });
});
router.get('/pagetest', function(req, res, next) {
    res.render('test', { title: 'Express' });
});
router.get('/detail', function(req, res, next) {
    res.render('detail', { title: 'Express' });
});
//喜欢页面
router.get('/likepagetest',function (req,res,next) {
    pool.getConnection(function (err,connection) {
        var param = req.query||res.params;
        //
        connection.query(likeSQL.insert,[param.uid,param.cid,param.title], function(err, result) {
            if(result) {
                // var name=req.session.usename=result.usename;
                result = {
                    code: 200,
                    msg:'操作成功',
                    result:result,
                };

            }
            // 以json形式，把操作结果返回给前台页面
            responseJSON(res, result);
            // 释放连接
            connection.release();
        });
    })
})


//home页获取信息
router.get('/homepage',function (req,res,next) {
    pool.getConnection(function (err,connection) {
        var param = req.query||res.params;
        connection.query(conSQL.getPagebyId,[param.uid], function(err, result) {
            if(result) {
                // var name=req.session.usename=result.usename;
                result = {
                    code: 200,
                    msg:'查询成功',
                    result:result
                };
            }
            // 以json形式，把操作结果返回给前台页面
            responseJSON(res, result);

            // 释放连接
            connection.release();

        });
    })
})


//deitail页获取信息
router.get('/getpage',function (req,res,next) {
    pool.getConnection(function (err,connection) {
        var param = req.query||res.params;
        connection.query(conSQL.getPage,[param.title], function(err, result) {
            if(result) {
                // var name=req.session.usename=result.usename;
                result = {
                    code: 200,
                    msg:'查询成功',
                    result:result
                };
            }
            // 以json形式，把操作结果返回给前台页面
            responseJSON(res, result);

            // 释放连接
            connection.release();

        });
    })
})


//获取文章信息
router.get('/querypage',function (req,res,next) {
    pool.getConnection(function (err,connection) {
        var param = req.query||res.params;
        connection.query(conSQL.queryAll, function(err, result) {
            if(result) {
                // var name=req.session.usename=result.usename;
                result = {
                    code: 200,
                    msg:'查询成功',
                    result:result
                };
            }

            // 以json形式，把操作结果返回给前台页面
            responseJSON(res, result);

            // 释放连接
            connection.release();

        });
    })
})

router.get('/pagetestol',function (req,res,next) {
    pool.getConnection(function (err,connection) {
        var param = req.query||res.params;
        connection.query(conSQL.insert, [param.uid,param.zuozhe,param.con,param.conimg,param.title], function(err, result) {
            if(result) {
                // var name=req.session.usename=result.usename;
                result = {
                    code: 200,
                    msg:'成功',
                    result:result,
                };

            }

            // 以json形式，把操作结果返回给前台页面
            responseJSON(res, result);

            // 释放连接
            connection.release();

        });
    })
})



// 文件上传服务
router.post('/upload', upload.single('avatar'), function (req, res, next) {
    if (req.file) {
        // res.send('文件上传成功');
        // responseJSON();
        // sessionStorage.setItem('firstimg',file.filename)
        // res.send(req.file.filename);
        // console.log(req.file.filename);
        // responseJSON(res,req.file.filename);

        res.render('revise', { title: req.file.filename });
    }

});
// 文章上传服务
router.post('/pageupload', upload.single('avatar'), function (req, res, next) {
    if (req.file) {
        // res.send('文件上传成功');
        // responseJSON();
        // sessionStorage.setItem('firstimg',file.filename)
        // res.send(req.file.filename);
        // console.log(req.file.filename);
        // responseJSON(res,req.file.filename);

        res.render('writepage', { title: req.file.filename });
    }

});
/* 编写文章页. */
router.get('/writepage', function(req, res, next) {
    res.render('writepage', { title: 'Express' });
});

/* 用户详情页. */
router.get('/home', function(req, res, next) {
    res.render('home', { title: 'Express' });
});
/* 用户详情页. */
router.get('/revise', function(req, res, next) {
    res.render('revise', { title: 'Express' });
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* 用户注册 page. */
router.get('/register', function(req, res, next) {
    res.render('register', { title: 'Express' });
});

/* 用户登录 page. */
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Express' });
});

router.get('/home', function(req, res, next) {
    res.render('user', { title: 'Express' });
});
var pool = mysql.createPool( dbConfig.mysql );
// 响应一个JSON数据
var responseJSON = function (res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code:'-200',
            msg: '操作失败123'
        });
    } else {
        res.json(ret);
    }};
// 添加用户 get方法 不安全，可见
router.get('/addUser', function(req, res, next){
    // 从连接池获取连接
    pool.getConnection(function(err, connection) {
// 获取前台页面传过来的参数
        var param = req.query || req.params;
        // responseJSON(req.params)
// 建立连接 增加一个用户信息
        connection.query(userSQL.insert, [param.username,param.password,param.showname], function(err, result) {
            if(result) {
                // req.session.usename=result.
                result = {
                    code: 200,
                    msg:'增加成功',
                    result:result
                };
            }

            // 以json形式，把操作结果返回给前台页面
            responseJSON(res, result);

            // 释放连接
            connection.release();

        });
    });
});

//获取用户信息
router.get('/queryuser',function (req,res,next) {
    pool.getConnection(function (err,connection) {
        var param = req.query||res.params;
        connection.query(userSQL.getUserById, [param.uid], function(err, result) {
            if(result) {
                // var name=req.session.usename=result.usename;
                result = {
                    code: 200,
                    msg:'增加成功',
                    result:result
                };
            }

            // 以json形式，把操作结果返回给前台页面
            responseJSON(res, result);

            // 释放连接
            connection.release();

        });
    })
})

//插入文章 post方法
router.post('/addpage',function (req,res,next) {
    pool.getConnection(function (err,connection) {
        var uid=req.body.uid;
        var zuozhe =req.body.zuozhe;
        var conimg = req.body.conimg;
        var con = req.body.con;
        connection.query(conSQL.insert,[uid,zuozhe,con,conimg],function (err,result) {
            if (result){
                result = {
                    code: 200,
                    msg:'增加成功',
                    result:result
                };
            }
            responseJSON(res, result);
            connection.release();
        });

    });
});

router.get('/addpage',function (req,res,next) {
    pool.getConnection(function (err,connection) {
        var param = req.query||res.params;
        connection.query(userSQL.uppage, [param.uid,param.zuozhe,param.con,param.conimg], function(err, result) {
            if(result) {
                // var name=req.session.usename=result.usename;
                result = {
                    code: 200,
                    msg:'操作成功',
                    result:result,
                };

            }

            // 以json形式，把操作结果返回给前台页面
            responseJSON(res, result);

            // 释放连接
            connection.release();

        });
    })
})

//注册用户 post方法
router.post('/adduser',function (req,res,next) {
    pool.getConnection(function (err,connection) {
        var usename=req.body.username;
        var password=req.body.password;
        var showname =req.body.showname;
        connection.query(userSQL.insert,[usename,password,showname],function (err,result) {
            if (result){
                result = {
                    code: 200,
                    msg:'增加成功',
                    result:result
                };
            }
            responseJSON(res, result);
            connection.release();
        });

    });
});

//更改用户信息
router.post('/updatauser',function (req,res,next) {
    pool.getConnection(function (err,connection) {
        var password=req.body.password;
        var showname =req.body.showname;
        var email = req.body.email;
        var userimg  = req.body.userimg;
        var phone = req.body.phone;
        var uid = req.body.uid;
        connection.query(userSQL.updataUser,[showname,password,userimg,email,phone,uid],function (err,result) {
            if (result){
                result = {
                    code: 200,
                    msg:'修改成功',
                    result:result
                };
            }
            responseJSON(res, result);
            connection.release();
        });

    });
});

router.get('/updatauser',function (req,res,next) {
    pool.getConnection(function (err,connection) {
        var param = req.query||res.params;
        connection.query(userSQL.updataUser, [param.shownam,param.password,param.userimg,param.email,param.phone,param.uid], function(err, result) {
            if(result) {
                // var name=req.session.usename=result.usename;
                result = {
                    code: 200,
                    msg:'操作成功',
                    result:result,
                };

            }

            // 以json形式，把操作结果返回给前台页面
            responseJSON(res, result);

            // 释放连接
            connection.release();

        });
    })
})

//查询用户名是否重复

// router.post('/checkshowname',function (req,res,next) {
//     pool.getConnection(function (err,connection) {
//         var showname=req.body.showname;
//         connection.query(userSQL.checkshowname,[showname],function (err,result) {
//             if(result){
//                 result={
//                     cood:200,
//                     msg:'该用户名已被注册',
//                 };
//             }
//             else {
//                 result={
//                     code:-200,
//                     msg:'该用户可以注册'
//                 };
//             }
//             responseJSON(res,result);
//             connection.release();
//         });
//     });
// });


router.get('/checkshowname',function (req,res,next) {
    pool.getConnection(function (err,connection) {
        var param = req.query||res.params;
        connection.query(userSQL.checkshowname, [param.showname], function(err, result) {
            if(result) {
                // var name=req.session.usename=result.usename;
                result = {
                    code: 200,
                    msg:'查询成功',
                    result:result,
                };

            }

            // 以json形式，把操作结果返回给前台页面
            responseJSON(res, result);

            // 释放连接
            connection.release();

        });
    })
})

//检测登录账号是否重复

router.get('/checkusername',function (req,res,next) {
    pool.getConnection(function (err,connection) {
        var param = req.query||res.params;
        connection.query(userSQL.checkusername, [param.username], function(err, result) {
            if(result) {
                // var name=req.session.usename=result.usename;
                result = {
                    code: 200,
                    msg:'查询成功',
                    result:result,
                };
            }

            // 以json形式，把操作结果返回给前台页面
            responseJSON(res, result);

            // 释放连接
            connection.release();

        });
    })
})

//用户登录
// router.post('/checkusername',function (req,res,next) {
//     pool.getConnection(function (err,connection) {
//         var username=req.body.username;
//         var pw=req.body.password;
//         connection.query(userSQL.checkusername,[username],function (err,result) {
//
//             if(result){
//                 // if(username==SQLusername&&pw==SQLpw){
//                     result={
//                         cood:200,
//                         msg:'成功登录',
//                     };
//                 //     res.render('index', { title: 'Express' });
//                 // }
//
//             }
//             else {
//                 result={
//                     code:-200,
//                     msg:'该用户可以注册'
//                 };
//             }
//             responseJSON(res,result,SQLusername);
//             connection.release();
//         });
//     });
// });

router.get('/logincheck',function (req,res,next) {
    pool.getConnection(function (err,connection) {
        var param = req.query||res.params;
        connection.query(userSQL.login, [param.username], function(err, result) {
            if(result) {
                // var name=req.session.usename=result.usename;
                result = {
                    code: 200,
                    msg:'查询成功',
                    result:result,
                };

            }

            // 以json形式，把操作结果返回给前台页面
            responseJSON(res, result);

            // 释放连接
            connection.release();

        });
    });
});

//设置用户信息

router.get('/setuser',function (req,res,next) {
    pool.getConnection(function (err,connection) {
        var param = req.query||res.params;
        connection.query(userSQL.getUserById, [param.uid], function(err, result) {
            if(result) {
                // var name=req.session.usename=result.usename;
                result = {
                    code: 200,
                    msg:'查询成功',
                    result:result,
                };
            }

            // 以json形式，把操作结果返回给前台页面
            responseJSON(res, result);
            // 释放连接
            connection.release();
        });
    });
});

module.exports = router;
