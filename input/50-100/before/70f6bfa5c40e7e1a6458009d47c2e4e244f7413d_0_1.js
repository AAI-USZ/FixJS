function () {
      $('#hugridButton').toggleClass('buttonisoff')
      $('#hugrid').toggle();
      $('#hugridRows').toggle();
      $("#hugridButton span").toggle();
      if (gridstate === 'on') {
        gridstate = 'off'
      } else {
        gridstate = 'on'
      }
    }