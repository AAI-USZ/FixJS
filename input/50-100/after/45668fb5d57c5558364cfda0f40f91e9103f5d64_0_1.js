function truncate() {
    $(".caption_cat").dotdotdot({
      height: 126,
      after: ".more_info",
      watch: 'window'
      });
    
    $(".equipment_title").dotdotdot({
      height: 54, // must match .equipment_title height
      watch: 'window'
      });

    $(".equipment_title").each(function(){
      $(this).trigger("isTruncated", function( isTruncated ) {
        if ( isTruncated ) {
          $(this).children(".equipment_title_link").tooltip();
        }
      });
    });
  }