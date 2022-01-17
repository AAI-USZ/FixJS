function($elem, height, padding){
  
  padding = padding || 5
  
  $elem = $($elem)
    .wrap('<div class="yj-scroller-viewport" />')
    .wrap('<div class="yj-scroller" />')

  var $viewport = $elem.parent().parent()
    , $scroller = $viewport.find('.yj-scroller').css('height', height)
    , $scrollbar = $("<div class='yj-mockscroll'><div class='yj-mockscroll-bar' /></div>").appendTo($viewport)
    , slowMode = $.browser.msie
    , disabled = false

    /*
    * Stick methods onto an object so we can control scroller programatically
    */  
    , scroller = {
      
        hide: function(){
          $scrollbar.stop(true, true).fadeOut('slow')
          delete scroller.visible;  
        }
      , show: function(){
        if (disabled) return;
        $scrollbar.stop(true, true).fadeIn(20)
        scroller.visible = true;
        }
      
      , disable: function(){
        scroller.hide();
        disabled = true;
      }
      , enable: function(){
        disabled = false;
      }

      , scrollCallbacks : []
      , timeout : null // Used to hide the bar on mouseout

      , scroll : function(e){
        if (disabled) return;
        if (slowMode && scroller.scrolling) return;

        scroller.calculate(e);
        
        for (var i = 0; i< scroller.scrollCallbacks.length; i++){
          scroller.scrollCallbacks[i](e);
        }
        
        if (slowMode){
          scroller.scrolling = true; 
          setTimeout(function(){delete scroller.scrolling}, 500)
        }
      }
      , wheel : function(e){
        if (!scroller.visible || disabled) return;
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
      
      /*
      * Based on the position of the $elem within the viewport,
      * position a scrollbar down the side, and size it proportionally
      * to the size of the internal element.
      */
      , calculate: function(e){
        var hiddenHeight = Math.max($elem.height() - $viewport.height(), 1)
          , scrollbarheight = Math.max((1/(hiddenHeight+100) * 100) * $viewport.height(), 10);
          
        $scrollbar.css({
            top : ($scroller.scrollTop() / hiddenHeight) * ($viewport.height() - scrollbarheight - 2*padding) + padding
          , height : scrollbarheight
        })
        $scroller.parent().scrollLeft(0)
        return scrollbarheight;
      }
      
      /*
      * Inverse of calculate
      * 
      * Given the y inset of the mouse from the top of the viewport
      * scroll the $elem to the point it would be if the scrollbar was
      * centered on the mouses y-position.
      */
      , uncalculate: function(ydiff){
        
         var hiddenHeight = Math.max($elem.height() - $viewport.height(), 1)
            , scrollbarheight = Math.max((1/(hiddenHeight+100) * 100) * $viewport.height(), 10)
            , top =  hiddenHeight * ((ydiff-padding-scrollbarheight/2)/($viewport.height() - scrollbarheight - 2*padding))
        
        $scroller.scrollTop(top)        
        scroller.calculate() // Move bar
      }
      
      , mouseover: function(e){
          if (disabled) return;
          if (scroller.timeout) 
            clearTimeout(scroller.timeout);
          scroller.calculate()
          scroller.show()   
        }
      , mouseout: function(e){
          if (!scroller.dragBar && !$(e.relatedTarget || e.target).parents().is('.yj-scroller-viewport')){            
            scroller.timeout = setTimeout(scroller.hide, 100)
          }  
        }
        
      , top: $.proxy($scroller.scrollTop, $scroller)
      , scrollToTop : function(){ $scroller.animate({scrollTop: 0}, 'fast')}
      
      // Scroll callbacks should be called infrequently for IE. let us handle that.
      , onScroll : function(func){
        scroller.scrollCallbacks.push(func);
      }
      
      
      , scrollbarMousedown: function(e){
        scroller.dragBar = e.pageY
        
        $(document.body).bind({
            'mouseleave.yj-scroller': scroller.scrollbarMouseup // mouseleave is useful here, and jquery simulates IE
          , 'mouseup.yj-scroller': scroller.scrollbarMouseup
          , 'mousemove.yj-scroller': scroller.barScroll 
          , 'selectstart.yj-scroller': function(e){e.preventDefault()} 
        })
        
      }
      
      /*
      * The mouseup for the scrollbar can be fired from anywhere
      * so be careful before assuming we can mousout.
      * 
      * Clear up events bound on mousedown
      */
      , scrollbarMouseup: function(e){
        delete scroller.dragBar;
        $(document.body).unbind('.yj-scroller')
        scroller.mouseout(e)
      }
      
      /*
      * an onscroll event for the scroll bar
      */
      , barScroll : function(e){
        if (scroller.dragBar == null)
          return;
        
        scroller.uncalculate(e.pageY - $viewport.offset().top)  
      }
      
      /**
      * Users can drag-scroll across the hidden element.
      * Sadly, we don't get a scroll event for this, so this uber-hacky
      * method adds a global mouse handler to cancel any horizontal 
      * scroll when a mousedown in the $elem occurs
      */
      , preventSideScroll: function(){
        $(document.body).bind({
            'mouseup.yj-scroller': function(){$(document.body).unbind('.yj-scroller')}
          , 'mousemove.yj-scroller': function(){$scroller.parent().scrollLeft(0)}
          , 'selectstart.yj-scroller': function(e){e.preventDefault()} 
        })
                
      }
      
    }
  
  /*
  * Bind the viewport with mouse events.
  */
  $viewport.bind({
    mouseover: scroller.mouseover
   , mouseout: scroller.mouseout
   , domchange : scroller.calculate
   , mousedown : scroller.preventSideScroll
   , touchmove : scroller.calculate // iOs
  })
  
  /*
  * Bind events onto the scrollbar
  * mice can drag it, but it shouldn't 
  * be draggable on touch devices
  */
  if (window.addEventListener){
    $scroller[0].addEventListener('DOMMouseScroll', scroller.wheel, false);
  	$scroller[0].addEventListener('mousewheel', scroller.wheel, false );
  } else {
    document.attachEvent("onmousewheel", scroller.wheel)
  }
  
  $scrollbar.bind({
   mousedown: scroller.scrollbarMousedown
  })
  
  return scroller;  
}