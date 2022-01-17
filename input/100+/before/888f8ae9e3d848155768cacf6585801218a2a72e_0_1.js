function(e) {
    if ($("#mask").length > 0) {
      e.preventDefault();
      return false;
    }

    $(document).trigger('customisation-opened');
    //BetaPopup.popup(, "customisation-tools");

    $("body").prepend("<div id='mask'></div>");
    $("body").prepend("<div id='popup' class='customisation-tools'></div>");

    $.get('/settings.raw', function(data){
      $('#popup').html(data).find('.inner').prepend("<p class='close'><a href='#' title='Click or press escape to close the settings panel'>Close</a></a>");
    });

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
      $(".customisation-tools h2").attr("tabindex",-1).focus();
      // if we get outside the lightbox, trap the focus and send it back
    /*  $("#popup").live('blur', function(){
        $(".customisation-tools h2").attr("tabindex",-1).focus();
      })*/
      if(getCookie("govuk-accessibility") == "wordsdifficult"){
        $('input[name=acc-options]:eq(1)').attr('checked', 'checked');
      }
      else{
        $('input[name=acc-options]:eq(0)').attr('checked', 'checked');
      }
    });

    $(".customisation-tools .close").live('click', function(e){
      e.preventDefault();
      $("#popup").unbind('blur');
      $("#popup").slideUp('fast').remove();
      $("#mask").fadeOut('fast').remove();
      $(".customisation-settings").focus();
      // $("#global-locator-box").hide();
    });

    $('.personalise-options').live("submit", function(){
      var id = $('input[name=acc-options]:checked').attr("id");
      _gaq.push(['_trackEvent', 'Citizen-Accessibility', id]);
      if(getCookie("govuk-accessibility")){
        deleteCookie("govuk-accessibility");
      }
      setCookie("govuk-accessibility", id, 4 * 30);
      setStyleSheet(id);
    return false;
    });

    e.preventDefault();
  }