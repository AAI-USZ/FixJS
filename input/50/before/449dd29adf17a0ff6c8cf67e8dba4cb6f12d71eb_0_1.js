function(){

        if(typeof el.opt.onEnd == "function")
          el.opt.onEnd(el);

        $("body").clearUnselectable();
        el.locked=false;

      }