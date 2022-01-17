function (actor, event) {
        if (event.get_key_symbol() == Clutter.Escape)
            this._close();
        return true;
    }