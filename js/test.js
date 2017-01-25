'use strict';

;(function (win) {
  //定义注册页面的DOM结构
  var form0 = '<form id=\'form0\'>\n  <label for=\'username\'>\u7528 \u6237 \u540D\uFF1A</label><input name=\'username\' type=\'text\' id=\'username\'/><span id=\'userwarn\'></span><br>\n  <label for=\'password1\'>\u5BC6 &nbsp \u7801\uFF1A</label><input name = \'password1\' type=\'password\' id=\'password1\'/><br>\n  <label for=\'password2\'>\u91CD\u590D\u5BC6\u7801\uFF1A</label><input name = \'password2\' type=\'password\' id=\'password2\'/><span id=\'passwarn\'></span><br>\n  <input type=\'submit\' value=\'submit\' /><br>\n  <span id=\'success\'></span>\n</form>';
  //定义登录页面的DOM结构
  var form1 = '<form id=\'form1\'>\n  <label for=\'username\'>\u7528\u6237\u540D\uFF1A</label><input name=\'username\' type=\'text\' id=\'username\' placeHolder=\'username\'/><span id=\'userwarn\'></span><br>\n  <label for=\'password\'>\u5BC6&nbsp\u7801\uFF1A</label><input name = \'password\' type=\'password\' id=\'password\' /><span id=\'passwarn\'></span><br>\n  <input type=\'submit\' value=\'submit\' /><br>\n  <span id=\'success\'></span>\n</form>';
  //
  var logout = '<h1>logout</h1>';
  var home = '<h1>welcome</h1>';
  var passwarn = '*\u4E24\u6B21\u5BC6\u7801\u4E0D\u4E00\u81F4';
  var userwarn = '*\u7528\u6237\u540D\u5DF2\u5B58\u5728';

  //建立hash路由
  var router = new win.router();

  //获取页面更改的元素
  var page = document.getElementById('page');

  //注册主页路由事件
  router.route('/', function () {
    //从服务器端获取商家发布的新信息
    method.ajax(null, 'http://localhost:8081/', 'post', function (responseText) {
      var infos = JSON.parse(responseText);
      var s = '1';
      var list = '<div>';
      infos.forEach(function (data) {
        list += '\n      <div>\n      <h1>' + data.username + '</h1>\n      <p>' + data.info + '</p>\n      <p>' + data.time + '</p><br>\n      </div>';
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
              localStorage.sign_in = 'true';
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
    var _this = this;

    //先显示注册页面的form表单
    page.innerHTML = form0;
    var form = document.getElementById('form0');
    //对form绑定submit事件
    method.addevent(form, 'submit', function (event) {
      console.log(_this);
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
            if (responseText === 'no') {
              document.getElementById('userwarn').innerHTML = userwarn;
            } else if (responseText === 'yes') {
              (function () {
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