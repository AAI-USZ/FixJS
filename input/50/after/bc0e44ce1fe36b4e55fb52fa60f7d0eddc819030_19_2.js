function() {
      var busy = this.app.store('Busytime');

      busy.removeEventListener(
        'add ' + this.monthId, this._onBusyAdd
      );

      busy.removeEventListener(
        'remove ' + this.monthId, this._onBusyRemove
      );
    }