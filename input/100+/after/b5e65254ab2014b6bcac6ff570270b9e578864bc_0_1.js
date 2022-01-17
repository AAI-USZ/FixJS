function(url) {
  try {
    var url_obj = URL.parse(url, true);
    var removing_param = [];
    $.each(url_obj.query, function(k, v) {
      if(/utm_/i.test(k)) { removing_param.push(k); }
    });
    $.each(removing_param, function(idx, param) {
      delete url_obj.query[param];
    });
    return URL.format(url_obj);
  } catch(e) {
    console.log('remove utm param error:', e);
    return url;
  }
}