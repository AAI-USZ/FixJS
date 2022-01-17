function ah_handle(activity) {
    this._currentActivity = activity;

    switch (this.activityName) {
      case 'new':
        document.location.hash = 'view-contact-form';
        if (this._currentActivity.source.data.params) {
          var param, params = [];
          for (var i in this._currentActivity.source.data.params) {
            param = this._currentActivity.source.data.params[i];
            params.push(i + '=' + param);
          }
          document.location.hash += '?' + params.join('&');
        }
        break;
      case 'edit':
        var id = this._currentActivity.source.data.contactId;
        if (!id) {
          this.cancel();
          return;
        }
        document.location.hash = 'view-contact-form?id=' + id;
        break;
    }
  }