function lists_shrinkCustomerToggle() {
    (customerShrinkMode)?customerShrinkMode=0:customerShrinkMode=1;
    if (customerShrinkMode) {
        $('#customer, #customer_head, #customer_foot').fadeOut(fading_enabled?"slow":0,lists_set_tableWrapperWidths);
        $('#customerShrink').css("background-image","url('../skins/"+skin+"/grfx/customerShrink_right.png')");
        if (!userShrinkMode)
          $('#userShrink').hide();
    } else {
        lists_set_tableWrapperWidths();
        $('#customer, #customer_head, #customer_foot').fadeIn(fading_enabled?"slow":0);
        $('#customerShrink').css("background-image","url('../skins/"+skin+"/grfx/customerShrink_left.png')");
        lists_resize();
        if (!userShrinkMode)
          $('#userShrink').show();
    }
}