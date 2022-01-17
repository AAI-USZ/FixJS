function() {
      var busy = this.controller.busytime;

      busy.removeEventListener(
        'add ' + this.monthId, this._onBusyAdd
      );

      busy.removeEventListener(
        'remove ' + this.monthId, this._onBusyRemove
      );
    }