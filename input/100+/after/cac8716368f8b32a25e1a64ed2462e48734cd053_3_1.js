function (event, jqXHR, ajaxSettings) {
      if (jqXHR.handled === true) {
        return;
      }
      var content_type = jqXHR.getResponseHeader('Content-Type');
      var error_msg;
      if (content_type.indexOf('/json') !== -1) {
        var json = $.parseJSON(jqXHR.responseText);
        error_msg = json.data.error.msg;
      } else {
        error_msg = 'Unknown Server Error';
        console.log('Unknown server error xhr:', jqXHR);
      }
      if (error_msg === 'need_login') {
        app.overlay({view: 'login_needed'});
      } else if (error_msg === 'not_found') {
        app.overlay({locals: {error: error_msg}, view: 'not_found'});
      } else {
        app.overlay({locals: {error: error_msg}, view: 'error'});
      }
    }