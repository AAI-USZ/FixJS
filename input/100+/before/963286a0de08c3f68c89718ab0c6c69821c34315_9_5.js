function lists_shrinkKndToggle() {
    (kndShrinkMode)?kndShrinkMode=0:kndShrinkMode=1;
    if (kndShrinkMode) {
        $('#knd, #knd_head, #knd_foot').fadeOut(fading_enabled?"slow":0,lists_set_tableWrapperWidths);
        $('#kndShrink').css("background-image","url('../skins/"+skin+"/grfx/kndShrink_right.png')");
        if (!usrShrinkMode)
          $('#usrShrink').hide();
    } else {
        lists_set_tableWrapperWidths();
        $('#knd, #knd_head, #knd_foot').fadeIn(fading_enabled?"slow":0);
        $('#kndShrink').css("background-image","url('../skins/"+skin+"/grfx/kndShrink_left.png')");
        lists_resize();
        if (!usrShrinkMode)
          $('#usrShrink').show();
    }
}