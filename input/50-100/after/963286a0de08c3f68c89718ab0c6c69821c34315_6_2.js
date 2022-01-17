function ts_ext_applyHoverIntent() {
    $('#timeSheet tr').hoverIntent({
        sensitivity: 1,
        interval: 500,
        over:
          function() { 
              $('#timeSheet tr').removeClass('hover');
              $(this).addClass('hover');},
        out:
          function() {
              $(this).removeClass('hover');
          }
    });
}