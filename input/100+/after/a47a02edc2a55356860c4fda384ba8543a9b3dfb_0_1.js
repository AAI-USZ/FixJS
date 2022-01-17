function (resp) {
        var html, i;
        if(!resp.error && !resp.result.error){
          if(protocol === 'http' && !reopen){
            tabs.makeNew(protocol, port);
          }
          options.active = true;
          visual.stateChange(protocol, port, true);
          options.body += 'Socket opened succesfully. Listening on port: '+ port;
          options.cssClass = 'css-streamNewConnection';
        }
        else{
          options.cssClass = 'css-streamError';
          options.body += resp.result.error;
          for(i=0; i < resp.errors.length; i=i+1){
						options.body += resp.errors[i].message;
					}
        }
        if(protocol === 'http'){
          injectMessage(options, 'default');
          injectMessage(options, port);
        }
        else{
          injectMessage(options);
        }
      }