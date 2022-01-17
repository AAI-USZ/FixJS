function makeRequest(protocol) {
    var options = {}
      , port = $('.js-portNum.js-'+protocol).val()
      ;
    options.body = '';
    options.protocol = protocol;
    reqwest({
      url: 'http://'+window.location.host+'/listen'+protocol+'/'+port
    , type: 'json'
    , method: 'get'
    , error: function (err) { 
        console.log('Server Error: ', err);
        options.body = 'Cannot communicate with netbug server';
        options.cssClass = 'css-streamError';
        injectMessage(options);
      }
    , success: function (resp) {
        var html, i;
        if(!resp.error){
          options.active = true;
          visual.stateChange(options);
          options.body += 'Socket opened succesfully. Listening on port: '+ port;
          options.cssClass = 'css-streamNewConnection';
        }
        else{
          options.cssClass = 'css-streamError';
          for(i=0; i < resp.errors.length; i=i+1){
						options.body += resp.errors[i].message;
					}
        }
        injectMessage(options);
      }
    });
    openSocket(options);
  }