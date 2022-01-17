function(result, textstatus, xhr) {
      var params = $(result);
      placeholder.replaceWith(params);
      params.find('a[rel="popover"]').popover();
      var link = $item.siblings('[data-tag="edit"]');
      link.removeClass('warning').removeClass('error');
      if (params.find('.error').length > 0)
        link.addClass('error');
      else if (params.find('.warning').length > 0)
        link.addClass('warning');
    }