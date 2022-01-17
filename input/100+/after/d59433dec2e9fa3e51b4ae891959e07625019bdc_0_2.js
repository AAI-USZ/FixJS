function(el){

      el.oldPage = el.page;

      if(typeof el.opt.onDrag == "function")
        el.opt.onDrag(el,"left");

      if(el.page > 0)
        el.page--;

      $.mbMomentumSlide.goTo(el,el.page+1);
    }