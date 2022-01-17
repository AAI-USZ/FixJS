function(){
      var prefix = defaults.prefix;

      if( prefix !== "" ){
        try {
          prefix = eval(prefix)
        }
        catch(err) {}
        if (prefix[0] != '/')
          prefix = '/' + prefix
        if (prefix[prefix.length-1] != '/')
          prefix += '/'
      }

      return prefix;
    }