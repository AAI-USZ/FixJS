function() {
  $("#start").click(startCallback);
  $("#reset").click(resetCallback);
  $("#reset_signin").click(resetSigninCallback);
  
  $("#new_tomato_form").live("ajax:beforeSend", function() {
    TT.log("ajax:beforeSend");
    
    $(this).keypress(function(event) {
      TT.log("keypress event");
      
      // ENTER key
      event.which == 13 && event.preventDefault();
    });
  });
  
  $(document).keydown(function(event) {
    TT.log("keydown: " + event.which);
    
    // SPACE key
    event.which == 32 && startCallback(event);
    // ESC key
    event.which == 27 && resetCallback(event);
  });
  
  if((typeof window.chrome == 'undefined') || (window.chrome && window.chrome.app && window.chrome.app.isInstalled)) {
    $("#add_to_chrome").hide();
  }

  $(".volume .up").click(function() {
    TT.setVolume(TT.getVolume() + 25);
    updateVolumeIcon();
  });
  $(".volume .down").click(function() {
    TT.setVolume(TT.getVolume() - 25);
    updateVolumeIcon();
  });
  $(".volume .mute_toggle").click(function() {
    TT.setVolume(0 == TT.getVolume() ? 50 : 0);
    updateVolumeIcon();
  });

  updateVolumeIcon();
}