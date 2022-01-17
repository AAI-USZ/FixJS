function(protocol){
      if(protocol === 'http' && Object.keys(resp.result[protocol]).length > 0){
        Object.keys(resp.result[protocol]).forEach(function(port){
          if(resp.result[protocol][port]){
            tabs.makeNew(protocol, port);
            options.body = 'Socket open. Listening on port: '+ port;
            options.cssClass = 'css-streamNewConnection';
            options.protocol = protocol;
            injectMessage(options, 'default');
            injectMessage(options, port);
            visual.stateChange(protocol, port);
          }
        });
      }
      else{
        if(resp.result[protocol].open){
          options.protocol = protocol;
          visual.stateChange(protocol, resp.result[protocol].port);
          options.body = 'Socket open. Listening on port: '+ resp.result[protocol].port;
          options.cssClass = 'css-streamNewConnection';
          options.protocol = protocol;
          injectMessage(options, resp.result[protocol].port);
          $('.js-portNum.js-'+protocol).val(resp.result[protocol].port);
        }
      }
    }