function(num, protocol){
        options.body = 'Closed Connection on '+num;
        options.cssClass = 'css-streamCloseConnection';
        visual.stateChange(protocol, num, false);
        options.protocol = protocol;
        if(protocol === 'http'){
          injectMessage(options, 'default');
          injectMessage(options, num);
        }
        else{
          injectMessage(options);
        }
      }