let form0 = `<form id='form0'>
  <label for='username'>用 户 名：</label><input name='username' type='text' id='username'/><span id='userwarn'></span><br>
  <label for='password1'>密 &nbsp 码：</label><input name = 'password1' type='password' id='password1'/><br>
  <label for='password2'>重复密码：</label><input name = 'password2' type='password' id='password2'/><span id='passwarn'></span><br>
  <input type='submit' value='submit' /><br>
  <span id='success'></span>
</form>`;
let form1 = `<form id='form1'>
  <label for='username'>用户名：</label><input name='username' type='text' id='username' placeHolder='username'/><br>
  <label for='password'>密&nbsp码：</label><input name = 'password' type='password' id='password' /><input type='submit' value='submit' /><br>
</form>`;
let logout = `<h1>logout</h1>`;
let home = `<h1>welcome</h1>`;
let passwarn = `*两次密码不一致`;
let userwarn = `*用户名已存在`;
let router = new router();
let page = document.getElementById('page');
router.route('/',function(){
  page.innerHTML = home;
});
router.route('/login',function(){
  page.innerHTML = form1;
  let form = document.getElementById('form1');
  method.addevent(form,'submit',(event)=>{
    event.preventDefault();
    let form = event.target;
    let username = form.username.value;
    let password = form.password.value;
    if(username && password){
        method.ajax(JSON.stringify({'username':username,'password':password}),'http://localhost:8081/register','post',function(){console.log('123')});
    }
  })
});
router.route('/register',function(){
  page.innerHTML = form0;
  let form = document.getElementById('form0');
  method.addevent(form,'submit',(event)=>{
    event.preventDefault();
    let form = event.target;
    let username = form.username.value;
    let password1 = form.password1.value;
    let password2 = form.password2.value;
    if(username && password1 && password2){
      if(password1 === password2)
          method.ajax(JSON.stringify({'username':username,'password':password1}),'http://localhost:8081/register','post',function(xhr){
              if(xhr.readyState===4){
                if(xhr.status>=200 && xhr.status < 300||xhr.status === 304 || xhr.status === 0){
                  console.log(xhr.responseText);
                  if(xhr.responseText === 'no'){
                    document.getElementById('userwarn').innerHTML=userwarn;
                  }else if(xhr.responseText === 'yes'){
                    let time = 3;
                    document.getElementById('success').innerHTML='注册成功，'+(time-1)+'s后返回首页';
                    let s = setInterval(function(){
                      time--;
                      if(time===0){
                        clearInterval(s);
                        location.hash = '#/';
                      }
                      document.getElementById('success').innerHTML='注册成功，'+(time-1)+'s后返回首页';
                    },1000);
                  }
                }
                else {
                  alert("unsuccessful "+xhr.status);
                }
              }
          });
      else {
        document.getElementById('passwarn').innerHTML=passwarn;
      }
    }else {
      if(username === ''){
        document.getElementById('userwarn').innerHTML="*用户名不能为空";
      }
      if(password1 === '' || password2 === ''){
        document.getElementById('passwarn').innerHTML="*密码不能为空";
      }
    }
  })
});
router.route('/logout',function(){
  page.innerHTML = logout;
});
router.init();
console.log(router);
method.addevent(window,'click',function(){
  let dropmenu = document.getElementsByClassName('dropdown-menu')[0];
  dropmenu.style.display = 'none';
})
function dropdowntoogle(event){
  event.stopPropagation();
  let dropmenu = document.getElementsByClassName('dropdown-menu')[0];
  let state = dropmenu.style.display;
  if(state ==='block'){
    dropmenu.style.display = 'none';
  }else {
    dropmenu.style.display = 'block';
  }
}
