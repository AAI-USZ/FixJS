function(data, textStatus) {
                          message_manager.show_available_messages(data);
                          if (typeof(callback) === "function") {
                              callback.call($(this), data); // execute callback
                          }
                      }