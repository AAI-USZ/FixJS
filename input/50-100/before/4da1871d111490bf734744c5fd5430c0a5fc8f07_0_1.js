function(display, window) {
        // We don't want to show the notification when the window is already focused,
        // because this is rather pointless.
        // Some apps (like GIMP) do things like setting the urgency hint on the
        // toolbar windows which would result into a notification even though GIMP itself is
        // focused.
        // We are just ignoring the hint on skip_taskbar windows for now.
        // (Which is the same behaviour as with metacity + panel)        

        if (!window || window.has_focus() || window.is_skip_taskbar() || window.get_wm_class() == "Skype")
            return;

        if (this._tracker.is_window_interesting(window)) {
            window.activate(global.get_current_time());
        }
    }