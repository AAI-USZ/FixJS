function() {
      this._cache['document'] = $(document);
      this._cache['slider'] = this._settings.el;
      if (this._settings.bar) this._cache['bar'] = this._settings.el.find('.bar');
      this._cache['handle'] = this._settings.el.find('.handle');
      if (this._settings.labels) {
        this._cache['current'] = this._settings.el.find('.current');
      }
      return this._sliderAttr = {
        'width': this._cache['slider'].outerWidth()
      };
    }