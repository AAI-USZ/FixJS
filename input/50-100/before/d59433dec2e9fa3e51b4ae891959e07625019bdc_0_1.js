function(el){
      if(el.page < el.pages.length-1)
        el.page++;
      $.mbMomentumSlide.goTo(el,el.page+1);
    }