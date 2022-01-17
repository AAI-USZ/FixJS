function exp_ext_applyHoverIntent2expRows() {
    $('#exp tr').hoverIntent({
        sensitivity: 1,
        interval: 500,
        over:
          function() { 
              $('#exp tr').removeClass('hover');
              $(this).addClass('hover');},
        out:
          function() {
              $(this).removeClass('hover');
          }
    });
}