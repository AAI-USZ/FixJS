function (err) { 
        options.body = 'Cannot communicate with netbug server';
        options.cssClass = 'css-streamError';
        injectMessage(options);
      }