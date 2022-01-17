function(jqXHR, textStatus, errorThrown) {
                        var st = jqXHR.status; 
                        if (st == 401 || st == 403) {
                            var msg = (st == 401)? "Invalid username or password" : "Access denied: please log in";
                            say_status(msg);
                            show_login_form();
                        } else {
                            var err_msg = "Unable to load messages: ";
                            if (st === 0 && textStatus === 'error') { // x-domain hard to detect, sometimes intermittent?
                                err_msg += "maybe try refreshing page?";
                            } else {
                                err_msg += textStatus + " (" + st + ")";
                            }
                            say_status(err_msg);
                        }
                      }