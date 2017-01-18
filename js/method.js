;(function(win,method){
  var register = function(event){
    event.preventDefault();
    var form = document.getElementById('form1');
    console.log(form.user.value);
    console.log(form.password.value);
    
  };
  var event = {};
  event.addevent = function(element,type,handler){
    if(element.addEventListener){
      element.addEventListener(type,handler,false);
    }else if(element.attachEvent){
        element.attachEvent('on'+type,handler);
      }else {
         element['on'+type]=handler;
      }
  }
  method.ready = function(){
    var form = document.getElementById('form1');
    event.addevent(form,'submit',register);
  }
})(window,window['method'] || (window['method']={}));
