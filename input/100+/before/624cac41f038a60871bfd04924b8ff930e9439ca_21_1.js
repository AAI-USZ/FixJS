function (success, data) {
                if (success) {
                    sakai.api.Util.notification.show($("#deletecontent_message_title").html(), $(successMessage).html());
                } else {
                    sakai.api.Util.error.show($("#deletecontent_message_title").html(), $("#deletecontent_message_error").html()); 
                }

                $(window).trigger("done.deletecontent.sakai", [pathsToDelete]);
                if ($.isFunction(callback)) {
                    callback(success);
                }
                sakai.api.Util.progressIndicator.hideProgressIndicator();
                sakai.api.Util.Modal.close($deletecontent_dialog);
            }