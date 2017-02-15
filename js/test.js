'use strict';

;(function (win) {
  //定义注册页面的DOM结构
  var form0 = '<form id=\'form0\'>\n  <label for=\'username\'>\u7528 \u6237 \u540D\uFF1A</label><input name=\'username\' type=\'text\' id=\'username\'/><span id=\'userwarn\'></span><br>\n  <label for=\'password1\'>\u5BC6 &nbsp \u7801\uFF1A</label><input name = \'password1\' type=\'password\' id=\'password1\'/><br>\n  <label for=\'password2\'>\u91CD\u590D\u5BC6\u7801\uFF1A</label><input name = \'password2\' type=\'password\' id=\'password2\'/><span id=\'passwarn\'></span><br>\n  <input type=\'submit\' value=\'submit\' /><br>\n  <span id=\'success\'></span>\n</form>';
  //定义登录页面的DOM结构
  var form1 = '<form id=\'form1\'>\n  <label for=\'username\'>\u7528\u6237\u540D\uFF1A</label><input name=\'username\' type=\'text\' id=\'username\' placeHolder=\'username\'/><span id=\'userwarn\'></span><br>\n  <label for=\'password\'>\u5BC6&nbsp\u7801\uFF1A</label><input name = \'password\' type=\'password\' id=\'password\' /><span id=\'passwarn\'></span><br>\n  <input type=\'submit\' value=\'submit\' /><br>\n  <span id=\'success\'></span>\n</form>';
  //
  var logout = '<h1>logout</h1><span id=\'success\'></span>';
  var home = '<h1>welcome</h1>';
  var passwarn = '*\u4E24\u6B21\u5BC6\u7801\u4E0D\u4E00\u81F4';
  var userwarn = '*\u7528\u6237\u540D\u5DF2\u5B58\u5728';

  //建立hash路由
  var router = new win.router();

  //获取页面更改的元素
  var page = document.getElementById('page');

  //检测用户是否登录
  function testlogin() {
    if (localStorage.sign_in === 'true') {

      return true;
    } else {
      return false;
    }
  }

  //注册主页路由事件
  router.route('/', function () {
    var menulist = document.getElementById('menu-list');
    if (testlogin()) {
      var mainlist = '\n    <li><a href="#/post">\u53D1\u5E03</a></li>\n    <li><a href="#/logout">\u767B\u51FA</a></li>\n    ';
      menulist.innerHTML = mainlist;
    } else {
      console.log(false);
      var _mainlist = '\n    <li><a href="#/register">\u6CE8\u518C</a></li>\n    <li><a href="#/login">\u767B\u5F55</a></li>\n    ';
      menulist.innerHTML = _mainlist;
    }
    //从服务器端获取商家发布的新信息
    method.ajax(null, 'http://localhost:8081/', 'post', function (responseText) {
      var infos = JSON.parse(responseText);
      var s = '1';
      var list = '<div>';
      infos.forEach(function (data) {
        list += '\n      <div>\n      <h1>' + data.username + '</h1>\n      <p style=\'padding-left:10%;\'>' + data.info + '</p>\n      <p style=\'text-align:right;\'>' + data.time + '</p><br>\n      </div>';
      });
      list += '</div>';
      //将新信息写入page中，整个页面中，打折圈三个字是不变的，别的都是改变的
      page.innerHTML = list;
    });
  });

  //注册登录页面路由事件
  router.route('/login', function () {
    //首先把form1显示出来
    page.innerHTML = form1;
    var form = document.getElementById('form1');
    //对该form绑定submit事件
    method.addevent(form, 'submit', function (event) {
      //阻止默认事件
      event.preventDefault();
      var form = event.target;
      var username = form.username.value;
      var password = form.password.value;
      if (username && password) {
        document.getElementById('success').innerHTML = '已提交至服务器，请耐心等待';
        //如果用户名和密码都进行了填写，用ajax将其发送至服务器端，根据不同的反应进行不同的处理
        method.ajax(JSON.stringify({ 'username': username, 'password': password }), 'http://localhost:8081/login', 'post', function (responseText) {
          if (responseText === 'no username') {
            document.getElementById('userwarn').innerHTML = '*用户名不存在';
            document.getElementById('passwarn').innerHTML = '';
            document.getElementById('success').innerHTML = '';
          } else if (responseText === 'password wrong') {
            document.getElementById('passwarn').innerHTML = '*密码不正确';
            document.getElementById('userwarn').innerHTML = '';
            document.getElementById('success').innerHTML = '';
          } else if (responseText === 'yes') {
            (function () {
              localStorage.sign_in = true;
              // localStorage.username = username;
              var time = 3;
              document.getElementById('success').innerHTML = '注册成功，' + (time - 1) + 's后返回首页';
              var s = setInterval(function () {
                time--;
                if (time === 0) {
                  clearInterval(s);
                  location.hash = '#/';
                }
                document.getElementById('success').innerHTML = '注册成功，' + (time - 1) + 's后返回首页';
              }, 1000);
            })();
          }
          console.log(responseText);
        });
      }
    });
  });

  //绑定注册页面的路由
  router.route('/register', function () {
    //先显示注册页面的form表单
    page.innerHTML = form0;
    var form = document.getElementById('form0');
    //对form绑定submit事件
    method.addevent(form, 'submit', function (event) {
      event.preventDefault();
      var form = event.target;
      var username = form.username.value;
      var password1 = form.password1.value;
      var password2 = form.password2.value;
      //用户名以及密码不能为空
      if (username && password1 && password2) {
        //校验两次密码是否一致
        if (password1 === password2) {
          document.getElementById('success').innerHTML = '已提交至服务器，请耐心等待';
          //从服务器端检验进行
          method.ajax(JSON.stringify({ 'username': username, 'password': password1 }), 'http://localhost:8081/register', 'post', function (responseText) {
            var info = JSON.parse(responseText);
            console.log(info);
            if (info.right === 'no') {
              document.getElementById('userwarn').innerHTML = userwarn;
            } else if (info.right === 'yes') {
              (function () {
                localStorage.sign_in = true;
                // localStorage.username = username;
                localStorage.token = info.token;
                var time = 3;
                document.getElementById('success').innerHTML = '登录成功，' + (time - 1) + 's后返回首页';
                var s = setInterval(function () {
                  time--;
                  if (time === 0) {
                    clearInterval(s);
                    location.hash = '#/';
                  }
                  document.getElementById('success').innerHTML = '登录成功，' + (time - 1) + 's后返回首页';
                }, 1000);
              })();
            }
          });
        } else {
          document.getElementById('passwarn').innerHTML = passwarn;
        }
      } else {
        if (username === '') {
          document.getElementById('userwarn').innerHTML = "*用户名不能为空";
        }
        if (password1 === '' || password2 === '') {
          document.getElementById('passwarn').innerHTML = "*密码不能为空";
        }
      }
    });
  });

  //注册登出页面的路由
  router.route('/logout', function () {
    page.innerHTML = logout;
    localStorage.sign_in = false;
    var time = 3;
    document.getElementById('success').innerHTML = '登出成功，' + (time - 1) + 's后返回首页';
    var s = setInterval(function () {
      time--;
      if (time === 0) {
        clearInterval(s);
        location.hash = '#/';
      }
      document.getElementById('success').innerHTML = '登出成功，' + (time - 1) + 's后返回首页';
    }, 1000);
  });

  //发布页面的路由
  var post = '\n<form id=\'form3\'>\n  <textarea name=\'info\' placeHolder=\'\u60F3\u8981\u53D1\u5E03\u7684\u6253\u6298\u4FE1\u606F\'></textarea><br>\n  <button id=\'cancel\'>\u53D6\u6D88</cancel></button><input type=\'submit\' value = \'\u53D1\u5E03\'><br>\n  <span id=\'success\'></span>\n</form>\n';
  router.route('/post', function () {
    var menulist = document.getElementById('menu-list');
    if (testlogin()) {
      var mainlist = '\n    <li><a href="#/post">\u53D1\u5E03</a></li>\n    <li><a href="#/logout">\u767B\u51FA</a></li>\n    ';
      menulist.innerHTML = mainlist;
      page.innerHTML = post;
      var form = document.getElementById('form3');
      method.addevent(form, 'submit', function (form) {
        event.preventDefault();
        document.getElementById('success').innerHTML = '已提交至服务器，请耐心等待';
        method.ajax(JSON.stringify({ 'token': localStorage.token, 'info': this.info.value, 'time': new Date().toLocaleString() }), 'http://localhost:8081/post', 'post', function (responseText) {
          if (responseText === 'yes') {
            (function () {
              var time = 3;
              document.getElementById('success').innerHTML = '发布成功，' + (time - 1) + 's后返回首页';
              var s = setInterval(function () {
                time--;
                if (time === 0) {
                  clearInterval(s);
                  location.hash = '#/';
                }
                document.getElementById('success').innerHTML = '发布成功，' + (time - 1) + 's后返回首页';
              }, 1000);
            })();
          } else {
            alert('用户未登陆');
            location.hash = '#/login';
          }
        });
      });
    } else {
      (function () {
        var mainlist = '\n    <li><a href="#/register">\u6CE8\u518C</a></li>\n    <li><a href="#/login">\u767B\u5F55</a></li>\n    ';
        menulist.innerHTML = mainlist;
        page.innerHTML = '<h1>\u60A8\u5C1A\u672A\u767B\u5F55</h1><span id=\'success\'></span>';
        var time = 3;
        document.getElementById('success').innerHTML = '尚未登录，' + (time - 1) + 's后返回首页';
        var s = setInterval(function () {
          time--;
          if (time === 0) {
            clearInterval(s);
            location.hash = '#/login';
          }
          document.getElementById('success').innerHTML = '尚未登录，' + (time - 1) + 's后返回首页';
        }, 1000);
      })();
    }
  });

  //初始化页面路由
  router.init();

  //注册menu下拉菜单事件。
  method.addevent(window, 'click', function () {
    var dropmenu = document.getElementsByClassName('dropdown-menu')[0];
    dropmenu.style.display = 'none';
  });
  var menu = document.getElementById('menu');
  method.addevent(menu, 'click', function dropdowntoogle(event) {
    event.stopPropagation();
    var dropmenu = document.getElementsByClassName('dropdown-menu')[0];
    var state = dropmenu.style.display;
    if (state === 'block') {
      dropmenu.style.display = 'none';
    } else {
      dropmenu.style.display = 'block';
    }
  });
})(window);