function(el,idx){

      var $el = $(el);
      idx = idx-1;
      if(idx>=0 && idx< el.pages.length)
        el.page=idx;
      else
        el.page=0;

      el.actualPage = el.pages[el.page];

      var pos= el.opt.direction == "h" ? -($el.outerWidth()*el.page) : -($el.outerHeight()*el.page);
      var css = el.opt.direction == "h" ? {marginLeft:pos} : {marginTop:pos};

      var ease = "cubic-bezier(0,.98,.26,.97)";

      if(typeof el.opt.onBeforeEnd == "function")
        el.opt.onBeforeEnd(el);


      el.container.CSSAnimate(css,el.opt.duration, ease, "all", function(){

        if(typeof el.opt.onEnd == "function")
          el.opt.onEnd(el);

        $("body").clearUnselectable();
        el.locked=false;

      });
      if($(el.opt.indexPlaceHolder).length>0){
        $.mbMomentumSlide.buildIndex(el);
      }
    }