function lists_shrinkUserToggle() {
    (userShrinkMode)?userShrinkMode=0:userShrinkMode=1;
    if (userShrinkMode) {
        $('#user, #user_head, #user_foot').fadeOut(fading_enabled?"slow":0,lists_set_tableWrapperWidths);
        $('#userShrink').css("background-image","url('../skins/"+skin+"/grfx/customerShrink_right.png')");
    } else {
        $('#user, #user_head, #user_foot').fadeIn(fading_enabled?"slow":0);
    lists_set_tableWrapperWidths();
        $('#userShrink').css("background-image","url('../skins/"+skin+"/grfx/customerShrink_left.png')");
    }
}