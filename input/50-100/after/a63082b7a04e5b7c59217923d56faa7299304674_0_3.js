function(num, protocol){
        options.body = 'Closed Connection on '+num;
        options.cssClass = 'css-streamCloseConnection';
        visual.stateChange(protocol, num);
        options.protocol = protocol;
        injectMessage(options, 'default');
        injectMessage(options, num);
      }