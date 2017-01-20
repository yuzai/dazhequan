'use strict';

var form0 = '<form id=\'form0\'>\n  <label for=\'username\'>\u7528 \u6237 \u540D\uFF1A</label><input name=\'username\' type=\'text\' id=\'username\'/><br>\n  <label for=\'password\'>\u5BC6 &nbsp \u7801\uFF1A</label><input name = \'password\' type=\'password\' id=\'password\'/><br>\n  <label for=\'password\'>\u91CD\u590D\u5BC6\u7801\uFF1A</label><input name = \'password\' type=\'password\' id=\'password\'/><input type=\'submit\' value=\'submit\' /><br>\n</form>';
var form1 = '<form id=\'form1\'>\n  <label for=\'username\'>\u7528\u6237\u540D\uFF1A</label><input name=\'username\' type=\'text\' id=\'username\'/><br>\n  <label for=\'password\'>\u5BC6&nbsp\u7801\uFF1A</label><input name = \'password\' type=\'password\' id=\'password\'/><input type=\'submit\' value=\'submit\' /><br>\n</form>';
var logout = '<h1>logout</h1>';
var home = '<h1>welcome</h1>';
var router = new router();
var page = document.getElementById('page');
router.route('/', function () {
  document.body.style['background-color'] = 'skyblue';
  page.innerHTML = home;
});
router.route('/login', function () {
  document.body.style['background-color'] = 'yellow';
  page.innerHTML = form1;
});
router.route('/register', function () {
  document.body.style['background-color'] = 'blue';
  page.innerHTML = form0;
});
router.route('/logout', function () {
  document.body.style['background-color'] = 'green';
  page.innerHTML = logout;
});
router.init();
console.log(router);

function dropdowntoogle() {
  var dropmenu = document.getElementsByClassName('dropdown-menu')[0];
  var state = dropmenu.style.display;
  console.log(state);
  if (state === 'block') {
    dropmenu.style.display = 'none';
  } else {
    dropmenu.style.display = 'block';
  }
}