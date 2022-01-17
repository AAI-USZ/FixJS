function(data){
      $('#popup').html(data).find('.inner').prepend("<p class='close'><a href='#' title='Click or press escape to close the settings panel'>Close</a></a>");
    }