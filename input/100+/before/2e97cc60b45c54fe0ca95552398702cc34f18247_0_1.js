function(html, ident, source){
    $("body").append("<div id='mask'></div>").append("<div id='popup' class="+ident+"></div>");

    var source = source || "#header-global h1 a",
    $popup = $('#popup'), $win = $(window), $mask = $('#mask');
    $popup.append(html);

    $mask.fadeTo("fast",0.6);  

    //Get the window height and width
    var winH = $win.height();
    var winW = $win.width();

    //Set the popup window to center
    $popup.css('left', winW/2-$popup.width()/2);

    $popup.delay(100).fadeIn('fast', function(){
      $popup.find("h2").attr("tabindex",-1).focus();
    });
    $popup.on('keydown', function (e) {
       if ( e.which == 27 ){
           closePopup();
        }
    }).on("click", ".close", function(){
      closePopup()
      return false;
    });
    
    closePopup = function(){
      $popup.fadeOut(400, function(){
        $mask.slideUp('fast', function() { $(this).remove(); $popup.remove(); });
      });

      $(source).focus();
    }
  }