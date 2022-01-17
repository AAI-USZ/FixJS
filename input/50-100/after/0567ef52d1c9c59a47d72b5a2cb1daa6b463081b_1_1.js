function (status) {
        if (status === 'fail')
          callback(status);
        else {
          if (self.hasBeenDefined('$'))
            callback(null, self);
          else {
            if (webPage.injectJs('js/libs/zepto-1.0rc1/dist/zepto.min.js'))
              callback(null, self);
            else
              callback('Could not load Zepto (needed for testing)');
          }
        }
      }