function(e,el){

      var margin= el.opt.direction == "h" ? parseFloat(el.container.css("margin-left")) : parseFloat(el.container.css("margin-top"));
      var event= e;
      if(el.hasTouch){
        e = e.originalEvent;
        e = e.touches[0];
      }
      event.preventDefault();

      el.x = el.endX = e.clientX;
      el.y = el.endY = e.clientY;

      /*Check if the scrolling direction is the same of the component, otherwise user is doing something else*/
      el.locked = false;
      if(el.opt.direction == "h"){
        el.locked = Math.abs(el.startY - el.endY) > Math.abs(el.startX - el.endX)+50;
      }else if(el.opt.direction == "v"){
        el.locked = Math.abs(el.startX - el.endX) > Math.abs(el.startY - el.endY)+50;
      }

      if(el.canScroll && ! el.locked){
        el.scrolling=true;

        var condition = el.opt.direction == "h" ? Math.abs(el.startY - el.endY) : Math.abs(el.startX - el.endX);

        var dim = el.opt.direction == "h" ? el.w : el.h;

        var friction = margin>=0 || margin <= -dim ? 6:1;
        var x = Math.floor(el.startX-e.clientX) / friction;
        var y= Math.floor(el.startY-e.clientY) / friction;

        if(margin>10 && !el.bounceStartCalled){
          if(typeof el.opt.onBounceStart == "function"){
            el.opt.onBounceStart(el);
            el.bounceStartCalled=true;
          }
        }else if(margin < -(dim+10) && !el.bounceEndCalled){
          if(typeof el.opt.onBounceEnd === "function"){
            el.opt.onBounceEnd(el);
            el.bounceEndCalled=true;
          }
        }else if(condition<el.opt.anchor && el.anchored){
          event.stopPropagation();
        }else{
          el.anchored=false;
        }

        var dir = el.opt.direction == "h" ? (x<0 ? "left" : "right") :(y<0 ? "top" :"bottom");

        var css = el.opt.direction == "h" ? {"margin-left": el.startPosX-x} : {"margin-top": el.startPosY-y};
        el.container.css(css);
        if(typeof el.opt.onDrag == "function")
          el.opt.onDrag(el, dir);

      }else if(el.locked){
        $(el).momentumSlide("end");
      }

    }