function() {
      if ($(this).attr('href') == '#') {
        return
      }
      parent.location = $(this).attr('href')
      return false;
    }