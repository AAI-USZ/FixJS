function () {
      $('#hugridButton').toggleClass('buttonisoff') ;
      $('#hugrid').toggle();
      $('#hugridRows').toggle();
      $("#hugridButton span").toggle();
      window.hugrid.toggleState() ;
    }