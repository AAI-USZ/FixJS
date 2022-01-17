function(){

    var expense_resizeTimer = null;
    $(window).bind('resize', function() {
       if (expense_resizeTimer) clearTimeout(expense_resizeTimer);
       expense_resizeTimer = setTimeout(expense_extension_resize, 500);
    });

    
}