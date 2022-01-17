function(html, ident, source){
    var source = source || "#header-global h1 a";
    $("body").append("<div id='mask'></div>");
    $("body").append("<div id='popup' class="+ident+"></div>");
    //$("#popup").append("<p class='close'><a href='#'>Close</a></p>")
    $("#popup").append(html);

    //Get the screen height and width
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();

    //Set heigth and width to mask to fill up the whole screen
    $('#mask').css({'width':maskWidth,'height':maskHeight});
     
    $('#mask').fadeTo("fast",0.6);  

    //Get the window height and width
    var winH = $(window).height();
    var winW = $(window).width();

    //Set the popup window to center
    $("#popup").css('left', winW/2-$("#popup").width()/2);

    $("#popup").delay(100).fadeIn('fast', function(){
      $("#popup h2").attr("tabindex",-1).focus();
    });
    $(".close").live('keypress', function (e) {
       if ( e.keyCode == 27 ){
           closePopup();
        }
    });
    $(".close").live("click", function(){
      closePopup()
      return false;
    });
    closePopup = function(){
      $("#popup").fadeOut(400, function(){
        $("#mask").slideUp('fast');
        $("#mask").remove();
        $("#popup").remove();
      });

      $(source).focus();
    }
  }