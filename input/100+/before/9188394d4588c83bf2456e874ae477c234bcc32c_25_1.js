function rv_handleEvent(evt) {
    switch (evt.type) {
      case 'mozvisibilitychange':
        if (document.mozHidden) {
          window.clearTimeout(this._timeout);
          return;
        }
        // Refresh the view when app return to foreground.
        this.updateTime();
        break;

      case 'click':
        var input = evt.target;
        if (!input)
          return;

        switch (input.id) {
          case 'ring-btn-snooze':
            window.opener.FakeAlarmManager.snoozeHandler();
            window.close();
            break;

          case 'ring-btn-close':
            window.close();
            break;
        }
        break;
    }
  }