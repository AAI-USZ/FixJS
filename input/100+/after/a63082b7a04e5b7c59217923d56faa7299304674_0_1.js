function() {
    var options = {};
    options.protocol = 'all';
    options.body = '';
    openSocket(options);
    uiTabs.create('body', '.js-ui-tab a', '.js-ui-tab', '.js-ui-tab-view', 'http/default');
    reqwest({
      url: 'http://'+window.location.host+'/onPageLoad'
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
          initBuild(resp);
        }
        else{
          options.cssClass = 'css-streamError';
          for(i=0; i < resp.errors.length; i=i+1){
						options.body += resp.errors[i].message;
					}
          injectMessage(options);
        }
      }
    });
  }