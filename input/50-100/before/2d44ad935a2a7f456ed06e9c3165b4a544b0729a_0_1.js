function(result, textstatus, xhr) {
      var params = $(result);
      placeholder.replaceWith(params);
      params.find('a[rel="popover"]').popover();
    }