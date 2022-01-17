function () {
      notification = new cdb.ui.common.Notification({
        el: $('<div>'),
        timeout: 250,
        template: 'template'
      });
      notification.open();
    }