function(key)
    {
      var value = new RegExp(key + "=([^;]*)").exec(document.cookie);
      return value && decodeURIComponent(value[1]);
    }