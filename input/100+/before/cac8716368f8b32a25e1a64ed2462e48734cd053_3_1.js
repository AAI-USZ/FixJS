function () {
    
    $('a.reload_page').live('click', function (e) {
      e.preventDefault();
      app.reload(true);
    });
    $('a.open_login').live('click', function (e) {
      e.preventDefault();
      app.overlay({view: 'login_needed'});
    });
    $('a.go_back').live('click', function (e) {
      e.preventDefault();
      window.history.back();
    });
    
    app.once('user_loaded', function () {
      app.userbox = new app.views.userbox();
      
      if ( ! app.user_self.get('name') && window.location.hash.length <= 1) {
        app.go('User/register');
      }
      
      Backbone.history.start();
      var time = +new Date() - start_time;
      console.log('startup time', time);
    });
    app.user_self.load();
    
    var known_errors = ['login_needed', 'privileges_low'];
    $(document).ajaxError(function (event, jqXHR, ajaxSettings) {
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
    });
    
  }