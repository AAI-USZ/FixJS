function(el){

      var $el = $(el);
      clearTimeout(el.timer);
      el.canScroll=false;
      $el.removeClass("cursorGrabbing");

      if (!el.scrolling)
        return;

      el.scrolling=false;

      el.pageW = $el.outerWidth();
      el.pageH = $el.outerHeight();
      el.changePoint =  el.opt.direction == "h" ? el.pageW/2 : el.pageH/2;

      var checkPageX = Math.abs(el.startX-el.endX)>el.changePoint && parseFloat(el.container.css("margin-left"))<0 && el.pages.eq(el.page).length>0;
      var checkPageY = Math.abs(el.startY-el.endY)>el.changePoint && parseFloat(el.container.css("margin-top"))<0 && el.pages.eq(el.page).length>0;

      var changePage= el.opt.direction == "h" ? checkPageX : checkPageY;

      if(changePage){
        var canMove = el.opt.direction == "h" ? el.endX<el.startX : el.endY<el.startY;

        if(canMove){
          if(el.pages.eq(el.page+1).length>0)
            el.page++;
        }else{
          if(el.pages.eq(el.page-1).length>0)
            el.page--;
        }
      }
      $.mbMomentumSlide.goTo(el,el.page+1);
      el.anchored=false;
    }