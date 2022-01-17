function(url, data, success, dataType){
    if ($.isFunction(data)) dataType = dataType || success, success = data, data = null;
    return $.ajax({ type: 'POST', url: url, data: data, success: success, dataType: dataType });
  }