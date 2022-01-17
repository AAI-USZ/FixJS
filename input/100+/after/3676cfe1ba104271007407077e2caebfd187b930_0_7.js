function showError(msg){
      msg = msg || CKAN.Strings.errorLoadingPreview;
      return $('#ckanext-datapreview')
        .append('<div></div>')
        .addClass('alert alert-error fade in')
        .html(msg);
    }