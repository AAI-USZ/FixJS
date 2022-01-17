function() {
      
      var name = $(this).attr('name');
      
      // Consider the current URL
      var baseUrl = location.protocol + '//' + location.host + ':' + location.port + location.pathname;
      var params = location.search ? location.search.substring(1).split('&') : [];
      
      // Update the params
      var found = false;
      var newParams = [];
      $.each(params, function(i, param) {
        if(param.indexOf('sortBy='+name+',')===0){
          found = true;
          var paramSplit = param.split(',');
          // asc->desc (and implicitly, desc->none, by not pushing it to the newParams)
          if(paramSplit[1] == 'asc'){
            newParams.push(paramSplit[0] + ',desc');
          }
        } else {
          newParams.push(param);
        }
      });
      
      // New (none->asc)
      if(!found) {
        newParams.push('sortBy=' + name + ',asc');
      }
      
      var newSearch = newParams.join('&');
      
      location = baseUrl + (newSearch ? '?'+newSearch : '') + location.hash;
      
    }