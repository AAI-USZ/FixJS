function (resp) {
        var html, i;
        if(!resp.error){
          options.active = true;
          visual.stateChange(protocol, port);
          options.body += 'Socket opened succesfully. Listening on port: '+ port;
          options.cssClass = 'css-streamNewConnection';
        }
        else{
          options.cssClass = 'css-streamError';
          for(i=0; i < resp.errors.length; i=i+1){
						options.body += resp.errors[i].message;
					}
        }
        injectMessage(options, 'default');
        injectMessage(options, port);
      }