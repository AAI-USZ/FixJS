function(options) {
        var base_auth = getCurrentAuthCredentials();
        if (base_auth === "") {
            showLoginForm();
            return;
        }
        if (options) {
            if (typeof(options.callback) === 'function') {
                callback = options.callback;
            }
        }
        $login_element.stop().hide();
        $.ajax({
            dataType: "json", 
            type:     "post", 
            url:      url_root +"messages/available.json",
            beforeSend: function (xhr){
                xhr.setRequestHeader('Authorization', getCurrentAuthCredentials());
                xhr.withCredentials = true;
            },
            success:  function(data, textStatus) {
                          message_manager.show_available_messages(data);
                          if (typeof(callback) === "function") {
                              callback.call($(this), data); // execute callback
                          }
                      }, 
            error:    function(jqXHR, textStatus, errorThrown) {
                        var st = jqXHR.status; 
                        if (st == 401 || st == 403) {
                            var msg = (st == 401)? "Invalid username or password" : "Access denied: please log in";
                            say_status(msg);
                            showLoginForm();
                        } else {
                            say_status("Error: " + st + " " + textStatus);
                        }
                      }
        });    
    }