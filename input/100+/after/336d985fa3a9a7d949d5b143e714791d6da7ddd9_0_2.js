function() {
                $.validator.addMethod("requiredsuggest", function(value, element){
                    return value.indexOf(sakai.api.i18n.getValueForKey("ENTER_CONTACT_OR_GROUP_NAMES", "sendmessage")) === -1 && $.trim($(element).next("input.as-values").val()).replace(/,/g, "") !== "";
                }, sakai.api.i18n.getValueForKey("AUTOSUGGEST_REQUIRED_ERROR", "sendmessage"));

                var validateOpts = {
                    submitHandler: sendMessage
                };
                sakai.api.Util.Forms.validate($sendmessage_form, validateOpts, true);

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