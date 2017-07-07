/**
 * Created by zy on 2017/6/22.
 */
$(function () {
    //用户注册

    /*
    * 用户名正则判断
    * 
    * */
    var showNameReg = /^[a-zA-Z0-9\u4E00-\u9FA5]{5,17}$/;
    var usernameReg = /^[a-zA-Z0-9]{5,12}$/;
    var pwReg = /^[a-zA-Z0-9]{5,12}$/;
    var shownameNow = 0;
    var usernameNow = 0;
    var pwNow = 0;


    $('#shownam').change(function () {
            console.log(showNameReg.test($('#shownam').val()));

            if(showNameReg.test($('#shownam').val())){
                $('.jc-tips').css({"opacity":0});
                $.ajax({
                    type:'get',
                    url:'/checkshowname',
                    data:{"showname":$('#shownam').val()},
                    dataType:'json',
                    success:function (str) {
                        console.log(str);
                        console.log(str.result.length);
                        if(str.result.length==0){
                            shownameNow=1;
                            $('.jc-tips').css({"opacity":0});
                            $('.shownam-check').css({"opacity":1});
                        }
                        else{
                            $('.jc-tips').css({"opacity":1});
                            $('.shownam-check').css({"opacity":0});
                            $('.jc-tips').text('该用户名已被注册');
                        }
                    }
                })
            }
            else {
                $('.jc-tips').css({"opacity":1});
                $('.jc-tips').text('用户名不符合规范，5-16个字符，不能包含特殊符号');
            }
    });
//登录账号验证
    $('#usenmae').change(function () {
        if(usernameReg.test($('#usenmae').val())){
            $.ajax({
                type:'get',
                url:'/checkusername',
                data:{"username":$('#usenmae').val()},
                dataType:'json',
                success:function (str) {
                    if(str.result.length==0){
                        usernameNow=1;
                         $('.jc-tips').css({"opacity":0});
                        $('.usename-check').css({"opacity":1});
                    }
                    else{
                        $('.jc-tips').css({"opacity":1});
                        $('.usename-check').css({"opacity":0});
                        $('.jc-tips').text('该用户名已被注册');
                    }
                }
            })
        }
        else {
            $('.jc-tips').css({"opacity":1});
            $('.jc-tips').text('用户名不符合规范，5-12个字符，不能包含特殊符号');
        }
    });
    
    //登录密码验证
    $('#pw').change(function () {
        if (pwReg.test($('#pw').val())){
            pwNow=1;
            $('.jc-tips').css({"opacity":0});
            $('.pw-check').css({"opacity":1});
        }else
        {
            $('.jc-tips').css({"opacity":1});
            $('.jc-tips').text('密码不符合规范，5-12个字符，不能包含特殊符号');
        }
    });


    //注册事件

        $('#reg-sub-btn').click(function () {
            if(shownameNow==1&&usernameNow==1&&pwNow==1){
            $.ajax({
                type:'post',
                url:'/adduser',
                data:{"username":$('#usenmae').val(),"password":$("#pw").val(),"showname":$('#shownam').val()},
                dataType:'json',
                success:function (str) {
                    console.log(str)
                    resettext();
                    $('.mask-nav').css({"display":"block"});
                    $('.mask-nav').animate({"opacity":1},1000,"swing");
                },
                error:function (str) {
                    alert("诶嘿，注册失败了，傻吊")
                }
            })
            }
            else {
                $('.jc-tips').css({"opacity":1});
                $('.jc-tips').text('有信息不符合规格');
            }
        });


//mask事件
    $('.mask-nav').click(function () {
        $('.mask-nav').animate({"opacity":0},1000,"swing",function () {
            $('.mask-nav').css({"display":"none"});

        });
    });
        
        

//注册成功，清空输入框
    function resettext() {
        $('input').val('');
        $('.fa-check').css({"opacity":0})

    }

    //用户登录
    $('#login-sub-btn').click(function () {
        $.ajax({
            type:'get',
            url:'/logincheck',
            //,"password":$('#login-pw').val()
            data:{"username":$('#login-usenmae').val()},
            dataType:"json",
            success:function (str) {
                // console.log(str.result[0].username)
                console.log(str)
                if (str.result[0].username==$('#login-usenmae').val()&&str.result[0].password==$('#login-pw').val()){
                    //localStorage.setItem('userid',str.result[0].uid);
                    sessionStorage.setItem('islogin',1);
                    sessionStorage.setItem('userid',str.result[0].uid);
                    sessionStorage.setItem("showname",str.result[0].showname);
                    sessionStorage.setItem("useimg",str.result[0].userimg);
                    window.location.href="/";

                }
                else {
                    $('.jc-tips').css({"opacity":1});
                    $('.jc-tips').text('用户名或密码不正确');
                }
            }
        })
    })


//用户主页




});