function(e) {
      if (this._savedPath) {
        page(this._savedPath);
        this._savedPath = null;

        e.preventDefault();
        e.stopPropagation();

        // in theory this should happen during oninactive
        // when we switch out of the view this is a failsafe
        this._removeClickHandler();
      }
    }