'use strict';

var form0 = '<form id=\'form0\'>\n  <label for=\'username\'>\u7528 \u6237 \u540D\uFF1A</label><input name=\'username\' type=\'text\' id=\'username\'/><span id=\'userwarn\'></span><br>\n  <label for=\'password1\'>\u5BC6 &nbsp \u7801\uFF1A</label><input name = \'password1\' type=\'password\' id=\'password1\'/><br>\n  <label for=\'password2\'>\u91CD\u590D\u5BC6\u7801\uFF1A</label><input name = \'password2\' type=\'password\' id=\'password2\'/><span id=\'passwarn\'></span><br>\n  <input type=\'submit\' value=\'submit\' /><br>\n  <span id=\'success\'></span>\n</form>';
var form1 = '<form id=\'form1\'>\n  <label for=\'username\'>\u7528\u6237\u540D\uFF1A</label><input name=\'username\' type=\'text\' id=\'username\' placeHolder=\'username\'/><br>\n  <label for=\'password\'>\u5BC6&nbsp\u7801\uFF1A</label><input name = \'password\' type=\'password\' id=\'password\' /><input type=\'submit\' value=\'submit\' /><br>\n</form>';
var logout = '<h1>logout</h1>';
var home = '<h1>welcome</h1>';
var passwarn = '*\u4E24\u6B21\u5BC6\u7801\u4E0D\u4E00\u81F4';
var userwarn = '*\u7528\u6237\u540D\u5DF2\u5B58\u5728';
var router = new router();
var page = document.getElementById('page');
router.route('/', function () {
  page.innerHTML = home;
});
router.route('/login', function () {
  page.innerHTML = form1;
  var form = document.getElementById('form1');
  method.addevent(form, 'submit', function (event) {
    event.preventDefault();
    var form = event.target;
    var username = form.username.value;
    var password = form.password.value;
    if (username && password) {
      method.ajax(JSON.stringify({ 'username': username, 'password': password }), 'http://localhost:8081/register', 'post', function () {
        console.log('123');
      });
    }
  });
});
router.route('/register', function () {
  page.innerHTML = form0;
  var form = document.getElementById('form0');
  method.addevent(form, 'submit', function (event) {
    event.preventDefault();
    var form = event.target;
    var username = form.username.value;
    var password1 = form.password1.value;
    var password2 = form.password2.value;
    if (username && password1 && password2) {
      if (password1 === password2) method.ajax(JSON.stringify({ 'username': username, 'password': password1 }), 'http://localhost:8081/register', 'post', function (xhr) {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304 || xhr.status === 0) {
            // console.log(xhr.responseText);
            if (xhr.responseText === 'no') {
              document.getElementById('userwarn').innerHTML = userwarn;
            } else if (xhr.responseText === 'yes') {
              (function () {
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
          } else {
            alert("unsuccessful " + xhr.status);
          }
        }
      });else {
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
router.route('/logout', function () {
  page.innerHTML = logout;
});
router.init();
method.addevent(window, 'click', function () {
  var dropmenu = document.getElementsByClassName('dropdown-menu')[0];
  dropmenu.style.display = 'none';
});
function dropdowntoogle(event) {
  event.stopPropagation();
  var dropmenu = document.getElementsByClassName('dropdown-menu')[0];
  var state = dropmenu.style.display;
  if (state === 'block') {
    dropmenu.style.display = 'none';
  } else {
    dropmenu.style.display = 'block';
  }
}
