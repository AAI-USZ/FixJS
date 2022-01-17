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
      case 'pick':
        Contacts.navigation.home();
        break;
    }
  }