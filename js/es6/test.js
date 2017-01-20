let form0 = `<form id='form0'>
  <label for='username'>用 户 名：</label><input name='username' type='text' id='username'/><br>
  <label for='password'>密 &nbsp 码：</label><input name = 'password' type='password' id='password'/><br>
  <label for='password'>重复密码：</label><input name = 'password' type='password' id='password'/><input type='submit' value='submit' /><br>
</form>`;
let form1 = `<form id='form1'>
  <label for='username'>用户名：</label><input name='username' type='text' id='username'/><br>
  <label for='password'>密&nbsp码：</label><input name = 'password' type='password' id='password'/><input type='submit' value='submit' /><br>
</form>`;
let logout = `<h1>logout</h1>`;
let home = `<h1>welcome</h1>`;
let router = new router();
let page = document.getElementById('page');
router.route('/',function(){
  document.body.style['background-color'] = 'skyblue';
  page.innerHTML = home;
});
router.route('/login',function(){
  document.body.style['background-color'] = 'yellow';
  page.innerHTML = form1;
});
router.route('/register',function(){
  document.body.style['background-color'] = 'blue';
  page.innerHTML = form0;
});
router.route('/logout',function(){
  document.body.style['background-color'] = 'green';
  page.innerHTML = logout;
});
router.init();
console.log(router);

function dropdowntoogle(){
  let dropmenu = document.getElementsByClassName('dropdown-menu')[0];
  let state = dropmenu.style.display;
  console.log(state);
  if(state ==='block'){
    dropmenu.style.display = 'none';
  }else {
    dropmenu.style.display = 'block';
  }
}
