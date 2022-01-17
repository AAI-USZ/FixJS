function (status) {
        if (status === 'fail')
          callback(status);
        else {
          if (self.hasBeenDefined('$'))
            callback(null, self);
          else {
            // Use jQuery instead of Zepto for DOM manipulation during tests
            // There are problems about checking/unchecking the checkboxes
            if (webPage.injectJs('js/libs/jquery-1.7.1.min.js'))
              callback(null, self);
            else
              callback('Could not load jQuery (needed for testing)');
          }
        }
      }