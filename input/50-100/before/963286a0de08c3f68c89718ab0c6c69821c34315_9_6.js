function lists_shrinkExtToggle() {
    (extShrinkMode)?extShrinkMode=0:extShrinkMode=1;
    if (extShrinkMode) {
        $('#extShrink').css("background-image","url('../skins/"+skin+"/grfx/zefShrink_down.png')");
    } else {
        $('#extShrink').css("background-image","url('../skins/"+skin+"/grfx/zefShrink_up.png')");
    }
    lists_set_heightTop();
    hook_resize();
}