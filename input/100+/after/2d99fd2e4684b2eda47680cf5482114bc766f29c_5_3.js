function(obj, re){
      var path, func, __this = this, __own = {}.hasOwnProperty, __results = [];
      re == null && (re = true);
      if (re && obj.reload != null) {
        obj.reload.connect(function(){
          return __this.use(obj, false);
        });
      }
      for (path in obj) if (__own.call(obj, path)) {
        func = obj[path];
        __results.push(this.add(path, func));
      }
      return __results;
    }