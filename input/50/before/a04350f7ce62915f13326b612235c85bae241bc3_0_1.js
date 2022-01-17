function(actor) {
        if (Main.overview.visible || this._animationBlockCount > 0)
            return false;
        if (actor && (actor.meta_window.get_window_type() != Meta.WindowType.NORMAL))
            return false;
        return true;
    }