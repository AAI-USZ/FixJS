function(num, protocol){
        options.body = 'Closed Connection on '+num;
        options.cssClass = 'css-streamCloseConnection';
        visual.stateChange({
          active: false,
          protocol: protocol
        });
        options.protocol = protocol;
        injectMessage(options);
      }