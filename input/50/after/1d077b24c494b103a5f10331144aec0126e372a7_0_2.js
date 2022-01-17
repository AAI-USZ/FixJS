function(e) {
      if (this._activeDrag) {
        this._setSliderValueOnDrag(e);
        this._fireOnChange();
        this._cache['handle'].focus();
      }
      return this._activeDrag = false;
    }