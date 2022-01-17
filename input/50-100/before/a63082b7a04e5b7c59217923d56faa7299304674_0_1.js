function (resp) {
        var html, i;
        if(!resp.error){
          initBuild(resp);
        }
        else{
          options.cssClass = 'css-streamError';
          for(i=0; i < resp.errors.length; i=i+1){
						options.body += resp.errors[i].message;
					}
        }
        injectMessage(options);
      }