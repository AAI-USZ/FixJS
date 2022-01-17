function(jqXHR, textStatus, errorThrown) {
                        var st = jqXHR.status; 
                        if (st == 401 || st == 403) {
                            var msg = (st == 401)? "Invalid username or password" : "Access denied: please log in";
                            say_status(msg);
                            show_login_form();
                        } else {
                            say_status("Error: " + st + " " + textStatus);
                        }
                      }