;(function(win){
  var Router = function(){
    this.currenturl = '';
    this.methods = {
    };
  };
  Router.prototype.route = function(url,handler){
    this.methods[url] =handler;
  };
  Router.prototype.refresh = function(){
    this.currenturl = location.hash.slice(1) || '/';
    if(this.methods[this.currenturl]){
      this.methods[this.currenturl]();
    }else {
      console.log(this.currenturl);
    }
  }
  Router.prototype.init = function(){
    window['method'].addevent(window,'load',this.refresh.bind(this));
    window['method'].addevent(window,'hashchange',this.refresh.bind(this));
  };
  win.router = Router;
})(window);
