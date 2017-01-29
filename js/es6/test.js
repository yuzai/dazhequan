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
let logout = `<h1>logout</h1><span id='success'></span>`;
let home = `<h1>welcome</h1>`;
let passwarn = `*两次密码不一致`;
let userwarn = `*用户名已存在`;

//建立hash路由
let router = new win.router();

//获取页面更改的元素
let page = document.getElementById('page');

//检测用户是否登录
function testlogin(){
  if(localStorage.sign_in==='true'){
    return true;
  }else {
    return false;
  }
}

//注册主页路由事件
router.route('/',function(){
  let menulist = document.getElementById('menu-list');
  if(testlogin()){
    let mainlist = `
    <li><a href="#/post">发布</a></li>
    <li><a href="#/logout">登出</a></li>
    `;
    menulist.innerHTML = mainlist;
  }else {
    console.log(false)
    let mainlist = `
    <li><a href="#/register">注册</a></li>
    <li><a href="#/login">登录</a></li>
    `;
    menulist.innerHTML = mainlist;
  }
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
            localStorage.sign_in = true;
            localStorage.username = username;
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
                    localStorage.sign_in = true;
                    localStorage.username = username;

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
  localStorage.sign_in = false;
  let time = 3;
  document.getElementById('success').innerHTML='登出成功，'+(time-1)+'s后返回首页';
  let s = setInterval(function(){
    time--;
    if(time===0){
      clearInterval(s);
      location.hash = '#/';
    }
    document.getElementById('success').innerHTML='登出成功，'+(time-1)+'s后返回首页';
  },1000);
});

//发布页面的路由
let post = `
<form id='form3'>
  <textarea name='info' placeHolder='想要发布的打折信息'></textarea><br>
  <button id='cancel'>取消</cancel></button><input type='submit' value = '发布'><br>
  <span id='success'></span>
</form>
`
router.route('/post',function(){
  let menulist = document.getElementById('menu-list');
  if(testlogin()){
    let mainlist = `
    <li><a href="#/post">发布</a></li>
    <li><a href="#/logout">登出</a></li>
    `;
    menulist.innerHTML = mainlist;
    page.innerHTML = post;
    let form = document.getElementById('form3');
    method.addevent(form,'submit',function(form){
      event.preventDefault();
      document.getElementById('success').innerHTML='已提交至服务器，请耐心等待';
      method.ajax(JSON.stringify({'username':localStorage.username,'info':this.info.value,'time':(new Date()).toLocaleString()}),'http://localhost:8081/post','post',function(responseText){
        if(responseText==='yes'){
          let time = 3;
          document.getElementById('success').innerHTML='发布成功，'+(time-1)+'s后返回首页';
          let s = setInterval(function(){
            time--;
            if(time===0){
              clearInterval(s);
              location.hash = '#/';
            }
            document.getElementById('success').innerHTML='发布成功，'+(time-1)+'s后返回首页';
          },1000);
        }
      });
    })
  }else {
    let mainlist = `
    <li><a href="#/register">注册</a></li>
    <li><a href="#/login">登录</a></li>
    `;
    menulist.innerHTML = mainlist;
    page.innerHTML = `<h1>您尚未登录</h1><span id='success'></span>`;
    let time = 3;
    document.getElementById('success').innerHTML='尚未登录，'+(time-1)+'s后返回首页';
    let s = setInterval(function(){
      time--;
      if(time===0){
        clearInterval(s);
        location.hash = '#/login';
      }
      document.getElementById('success').innerHTML='尚未登录，'+(time-1)+'s后返回首页';
    },1000);
  }

})

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
