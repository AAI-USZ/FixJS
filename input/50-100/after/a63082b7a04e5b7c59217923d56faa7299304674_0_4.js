function () { 
        console.log('Browser-Disconnected socket');
        options.cssClass = 'css-streamError';
        options.body = 'NetBug Server Down';
        options.protocol = 'all';
        injectMessage(options);
        options.active = false;
        $('.js-log.activeLog').trigger('click');
        visual.stateChange('all');
      }