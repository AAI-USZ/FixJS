function(path, extra){
          var extra, sub;
          extra == null && (extra = {});
          sub = __this.system.resolve(path);
          return sub.run(__import(__this.args, extra));
        }