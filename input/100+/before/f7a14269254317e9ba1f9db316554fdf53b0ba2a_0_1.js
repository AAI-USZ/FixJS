function(xhr, textStatus, errorThrown) {
      var data = xhr;
      if(xhr.responseText) {
        var text = xhr.responseText.replace(/(<([^>]+)>)/ig,"");
        data = { message: text };
        try {
          data = eval("("  + xhr.responseText + ")");
        } catch(e) { }
      }
      if(options && options.skipDefaultError) {
        $.ajaxJSON.ignoredXHRs.push(xhr);
      }
      if(error && $.isFunction(error)) {
        error(data, xhr, textStatus, errorThrown);
      } else {
        $.ajaxJSON.unhandledXHRs.push(xhr);
      }
    }