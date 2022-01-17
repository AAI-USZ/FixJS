function(e){
        if (!scroller.visible || scroller.disabled) return;
        var e = e || window.event;
        
        //courtesy https://github.com/brandonaaron/jquery-mousewheel/blob/master/jquery.mousewheel.js
        var delta = 0;
        if (e.wheelDelta) { delta = -e.wheelDelta/120; }
        if (e.detail) { delta = e.detail / 3; }

        setTimeout(function(){
          $scroller.scrollTop($scroller.scrollTop() + delta * 40)
          scroller.scroll()
        },0);
        
        if (e.preventDefault) {e.preventDefault();}
        e.returnValue = false;
        return false;
      }