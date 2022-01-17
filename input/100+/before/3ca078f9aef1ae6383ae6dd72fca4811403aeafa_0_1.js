function() {
    var new_tags = this._visible_tags_input;
    var me = this;
    return function(e) {
        if (e.shiftKey) {
            return;
        }
        var key = e.which || e.keyCode;
        var text = me.getRawNewTagValue();
        //space 32, backspace 8, enter 13
        if (key == 32 || key == 13) {
            var tag_name = $.trim(text);
            if (tag_name.length > 0) {
                me.completeTagInput();
            }
        } else if (key == 8 && text.length == 0) {
            if (me.hasHotBackspace() === true) {
                me.editLastTag();
            } else {
                me.setHotBackspace(true);
            }
        }

        if (key !== 8) {
            me.setHotBackspace(false);
        }
        return false;
    };
}