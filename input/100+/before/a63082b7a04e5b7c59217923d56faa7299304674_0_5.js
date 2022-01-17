function(protocol){
      if(resp.result[protocol].open){
        options.protocol = protocol;
        visual.stateChange(options);
        options.body = 'Socket open. Listening on port: '+ resp.result[protocol].port;
        options.cssClass = 'css-streamNewConnection';
        injectMessage(options);
        $('.js-portNum.js-'+protocol).val(resp.result[protocol].port);
      }
    }