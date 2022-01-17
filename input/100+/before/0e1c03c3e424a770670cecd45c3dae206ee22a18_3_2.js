function () {
      if (!Modernizr.sessionstorage) {
        return;
      }

      var toolbarID = this.options.storagePrefix + 'Midgard.create.toolbar';
      if (sessionStorage.getItem(toolbarID)) {
        this._setOption('toolbar', sessionStorage.getItem(toolbarID));
      }

      var stateID = this.options.storagePrefix + 'Midgard.create.state';
      if (sessionStorage.getItem(stateID)) {
        this._setOption('state', sessionStorage.getItem(stateID));
      }

      this.element.bind('midgardcreatestatechange', function (event, options) {
        sessionStorage.setItem(stateID, options.state);
      });
    }