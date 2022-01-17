function expense_extension_applyHoverIntent() {
    $('#expenses tr').hoverIntent({
        sensitivity: 1,
        interval: 500,
        over:
          function() { 
              $('#expenses tr').removeClass('hover');
              $(this).addClass('hover');},
        out:
          function() {
              $(this).removeClass('hover');
          }
    });
}