function lists_shrinkUsrToggle() {
    (usrShrinkMode)?usrShrinkMode=0:usrShrinkMode=1;
    if (usrShrinkMode) {
        $('#usr, #usr_head, #usr_foot').fadeOut(fading_enabled?"slow":0,lists_set_tableWrapperWidths);
        $('#usrShrink').css("background-image","url('../skins/"+skin+"/grfx/kndShrink_right.png')");
    } else {
        $('#usr, #usr_head, #usr_foot').fadeIn(fading_enabled?"slow":0);
    lists_set_tableWrapperWidths();
        $('#usrShrink').css("background-image","url('../skins/"+skin+"/grfx/kndShrink_left.png')");
    }
}