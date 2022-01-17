function() {

                ////////////////////////
                // jqModal functions  //
                ////////////////////////

                $(send_message_cancel).die("click");
                $(send_message_cancel).live("click", function() {
                    if ($(messageDialogContainer).hasClass('s3d-dialog')) {
                        sakai.api.Util.Modal.close(messageDialogContainer);
                    }
                    if ($.isFunction(callbackWhenDone)) {
                        callbackWhenDone(false);
                    }
                });
            }