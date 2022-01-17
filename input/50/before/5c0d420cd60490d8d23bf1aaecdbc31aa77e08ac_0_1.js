function (message, title) {
          $.pnotify({
            title: title,
            type: 'error',
            icon: 'ui-icon ui-icon-script',
            text: message
          });
        }