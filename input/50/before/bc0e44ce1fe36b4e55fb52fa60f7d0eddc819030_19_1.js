function() {
      var busy = this.controller.busytime;

      //TODO: Its a known issue that changes in days in different
      //      months for this view will not be changed.
      busy.on('add ' + this.monthId, this._onBusyAdd);
      busy.on('remove ' + this.monthId, this._onBusyRemove);
    }