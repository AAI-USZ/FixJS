function ts_ext_applyHoverIntent2zefRows() {
    $('#zef tr').hoverIntent({
        sensitivity: 1,
        interval: 500,
        over:
          function() { 
              $('#zef tr').removeClass('hover');
              $(this).addClass('hover');},
        out:
          function() {
              $(this).removeClass('hover');
          }
    });
}