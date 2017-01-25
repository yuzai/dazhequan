;(function(win){
//定义注册页面的DOM结构
let form0 = `<form id='form0'>
  <label for='username'>用 户 名：</label><input name='username' type='text' id='username'/><span id='userwarn'></span><br>
  <label for='password1'>密 &nbsp 码：</label><input name = 'password1' type='password' id='password1'/><br>
  <label for='password2'>重复密码：</label><input name = 'password2' type='password' id='password2'/><span id='passwarn'></span><br>
  <input type='submit' value='submit' /><br>
  <span id='success'></span>
</form>`;
//定义登录页面的DOM结构
let form1 = `<form id='form1'>
  <label for='username'>用户名：</label><input name='username' type='text' id='username' placeHolder='username'/><span id='userwarn'></span><br>
  <label for='password'>密&nbsp码：</label><input name = 'password' type='password' id='password' /><span id='passwarn'></span><br>
  <input type='submit' value='submit' /><br>
  <span id='success'></span>
</form>`;
//
let logout = `<h1>logout</h1>`;
let home = `<h1>welcome</h1>`;
let passwarn = `*两次密码不一致`;
let userwarn = `*用户名已存在`;

//建立hash路由
let router = new win.router();

//获取页面更改的元素
let page = document.getElementById('page');

//注册主页路由事件
router.route('/',function(){
  //从服务器端获取商家发布的新信息
  method.ajax(null,'http://localhost:8081/','post',function(responseText){
    let infos = JSON.parse(responseText);
    let s='1';
    let list = `<div>`;
    infos.forEach(function(data){
      list += `
      <div>
      <h1>${data.username}</h1>
      <p>${data.info}</p>
      <p>${data.time}</p><br>
      </div>`;
    });
    list+='</div>';
    //将新信息写入page中，整个页面中，打折圈三个字是不变的，别的都是改变的
    page.innerHTML = list;
  })
});

//注册登录页面路由事件
router.route('/login',function(){
  //首先把form1显示出来
  page.innerHTML = form1;
  let form = document.getElementById('form1');
  //对该form绑定submit事件
  method.addevent(form,'submit',(event)=>{
    //阻止默认事件
    event.preventDefault();
    let form = event.target;
    let username = form.username.value;
    let password = form.password.value;
    if(username && password){
        document.getElementById('success').innerHTML='已提交至服务器，请耐心等待';
        //如果用户名和密码都进行了填写，用ajax将其发送至服务器端，根据不同的反应进行不同的处理
        method.ajax(JSON.stringify({'username':username,'password':password}),'http://localhost:8081/login','post',function(responseText){
          if(responseText === 'no username'){
            document.getElementById('userwarn').innerHTML='*用户名不存在';
            document.getElementById('passwarn').innerHTML='';
            document.getElementById('success').innerHTML='';
          }else if(responseText === 'password wrong'){
            document.getElementById('passwarn').innerHTML='*密码不正确';
            document.getElementById('userwarn').innerHTML='';
            document.getElementById('success').innerHTML='';
          }else if(responseText === 'yes'){
            localStorage.sign_in = 'true';
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
          console.log(responseText)
        });
    }
  })
});

//绑定注册页面的路由
router.route('/register',function(){
  //先显示注册页面的form表单
  page.innerHTML = form0;
  let form = document.getElementById('form0');
  //对form绑定submit事件
  method.addevent(form,'submit',(event)=>{
    console.log(this);
    event.preventDefault();
    let form = event.target;
    let username = form.username.value;
    let password1 = form.password1.value;
    let password2 = form.password2.value;
    //用户名以及密码不能为空
    if(username && password1 && password2){
      //校验两次密码是否一致
      if(password1 === password2){
          document.getElementById('success').innerHTML='已提交至服务器，请耐心等待';
          //从服务器端检验进行
          method.ajax(JSON.stringify({'username':username,'password':password1}),'http://localhost:8081/register','post',function(responseText){
                  if(responseText === 'no'){
                    document.getElementById('userwarn').innerHTML=userwarn;
                  }else if(responseText === 'yes'){
                    let time = 3;
                    document.getElementById('success').innerHTML='登录成功，'+(time-1)+'s后返回首页';
                    let s = setInterval(function(){
                      time--;
                      if(time===0){
                        clearInterval(s);
                        location.hash = '#/';
                      }
                      document.getElementById('success').innerHTML='登录成功，'+(time-1)+'s后返回首页';
                    },1000);
                  }
                }
          );
        }
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

//注册登出页面的路由
router.route('/logout',function(){
  page.innerHTML = logout;
});

//初始化页面路由
router.init();

//注册menu下拉菜单事件。
method.addevent(window,'click',function(){
  let dropmenu = document.getElementsByClassName('dropdown-menu')[0];
  dropmenu.style.display = 'none';
})
let menu = document.getElementById('menu');
method.addevent(menu,'click',function dropdowntoogle(event){
  event.stopPropagation();
  let dropmenu = document.getElementsByClassName('dropdown-menu')[0];
  let state = dropmenu.style.display;
  if(state ==='block'){
    dropmenu.style.display = 'none';
  }else {
    dropmenu.style.display = 'block';
  }
})
})(window);
