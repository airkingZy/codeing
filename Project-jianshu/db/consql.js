/**
 * Created by Administrator on 2017/6/17.
 */
var ConSQL = {
    // insert:'INSERT INTO User(uid,userName) VALUES(?,?)',
    // insert:'INSERT INTO User(username,password,showname) VALUES(?,?,?)',
    // queryAll:'SELECT * FROM User',
    // getUserById:'SELECT * FROM User WHERE uid = ? ',
    // checkshowname:'SELECT showname FROM User WHERE showname = ? ',
    // checkusername:'SELECT username FROM User WHERE username = ? ',
    // login:'SELECT * FROM User WHERE username = ?',
    // // setuser:'SELECT * FROM User WHERE uid = ?',?
    // updataUser:'UPDATE User SET showname = ?,password = ?,userimg = ?,email = ?,phone = ? WHERE uid = ?',
    insert:'INSERT INTO libary(uid,zuozhe,con,conimg,ishot,title) VALUES(?,?,?,?,0,?)',
    // queryAll:'SELECT * FROM User',
    getUserById:'SELECT * FROM libary WHERE uid = ? ',
    queryAll:'SELECT * FROM libary ',
    getPage:'SELECT * FROM libary WHERE title = ?',
    getPagebyId:'SELECT * FROM libary WHERE uid = ?',
    morepage:'SELECT * FROM libary WHERE limit ?,5',
    // likepage:'INSERT INTO like(uid,cid,title) VALUES(?,?,?)',
};
module.exports = ConSQL;