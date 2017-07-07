/**
 * Created by Administrator on 2017/6/17.
 */
var UserSQL = {
    // insert:'INSERT INTO User(uid,userName) VALUES(?,?)',
    insert:'INSERT INTO User(username,password,showname) VALUES(?,?,?)',
    queryAll:'SELECT * FROM User',
    getUserById:'SELECT * FROM User WHERE uid = ? ',
    checkshowname:'SELECT showname FROM User WHERE showname = ? ',
    checkusername:'SELECT username FROM User WHERE username = ? ',
    login:'SELECT * FROM User WHERE username = ?',
    // setuser:'SELECT * FROM User WHERE uid = ?',?
    updataUser:'UPDATE User SET showname = ?,password = ?,userimg = ?,email = ?,phone = ? WHERE uid = ?',
    uppage:'INSERT INTO libary(uid,zuozhe,con,conimg) VALUES(?,?,?,?)'

};
module.exports = UserSQL;