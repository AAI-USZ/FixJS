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

                ////////////////////
                // Initialization //
                ////////////////////

                $(document).on('initialize.sendmessage.sakai', function(e, userObj, insertInId, callback, subject, body, replyOnly, replyID, buttonText) {
                    initialize(userObj, insertInId, callback, subject, body, replyOnly, replyID, buttonText);
                });
                $(document).on('click', '.sakai_sendmessage_overlay', function(ev) {
                    var el = $(this);
                    var person = false;
                    var people = [];
                    if (el.attr('sakai-entityid') && el.attr('sakai-entityname')) {
                        var userIDArr = el.attr('sakai-entityid').split(',');
                        var userNameArr = sakai.api.Security.safeOutput(el.attr('sakai-entityname')).split(',');
                        for (var i = 0; i < userNameArr.length; i++) {
                            people.push({
                                'uuid': userIDArr[i],
                                'username': userNameArr[i],
                                'type': el.attr('sakai-entitytype') || 'user'
                            });
                        }
                    }
                    initialize(people);
                });
            }