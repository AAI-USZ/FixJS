function(path, args){
      var path, args, system, view, __ref, __i, __len;
      args == null && (args = {});
      if (typeof path !== "string") {
        __ref = [path || args, this.id], args = __ref[0], path = __ref[1];
      }
      for (__i = 0, __len = (__ref = constructor.views).length; __i < __len; ++__i) {
        system = __ref[__i];
        view = system.resolve(path);
        if (view) {
          return view.run(args);
        }
      }
      throw Error('unimplemented');
    }