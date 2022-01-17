function(button, event) {
        this.close(global.get_current_time());
        this._invocation.return_value(GLib.Variant.new('(s)', ['cancelled']));
    }