;(function(win,method){
  var register = function(event){
    event.preventDefault();
    var form = document.getElementById('form1');
    console.log(form.username.value);
    console.log(form.password.value);
  };
  method.addevent = function(element,type,handler){
    if(element.addEventListener){
      element.addEventListener(type,handler,false);
    }else if(element.attachEvent){
        element.attachEvent('on'+type,handler);
      }else {
         element['on'+type]=handler;
      }
  };
  method.ready = function(){
    var form = document.getElementById('form1');
    method.addevent(form,'submit',register);
  };
  method.ajax = function(data,url,methods,handler){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
      if(xhr.readyState===4){
        if(xhr.status>=200 && xhr.status < 300||xhr.status === 304){
          // console.log(xhr.responseText);
          handler(xhr.responseText);
        }
        else {
          alert("ajax通信失败 "+xhr.status);
        }
      }
    };
    xhr.open(methods,url,true);
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.send(data);
  }
})(window,window['method'] || (window['method']={}));
