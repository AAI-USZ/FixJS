function(el){

      el.oldPage = el.page;

      if(typeof el.opt.onDrag == "function")
        el.opt.onDrag(el,"right");

      if(el.page < el.pages.length-1)
        el.page++;

      $.mbMomentumSlide.goTo(el,el.page+1);
    }