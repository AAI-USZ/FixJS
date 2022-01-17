function(name, value){
      var res;
      return (typeof name == 'string' && value === undefined) ?
        (this.length == 0 ? undefined :
          (name == 'value' && this[0].nodeName == 'INPUT') ? this.val() :
          (!(res = this[0].getAttribute(name)) && name in this[0]) ? this[0][name] : res
        ) :
        this.each(function(idx){
          if (isO(name)) for (key in name) this.setAttribute(key, name[key])
          else this.setAttribute(name, funcArg(this, value, idx, this.getAttribute(name)));
        });
    }