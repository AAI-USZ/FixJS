function(userObj, $insertInId, callback, subject, body, replyOnly, replyID, buttonText) {
                layover = true;
                // Make sure that everything is standard.
                resetView();
                // The user we are sending a message to.
                if (userObj && (($.isPlainObject(userObj) && userObj.username) || $.isArray(userObj))) {
                    toUser = userObj;
                } else {
                    toUser = false;
                }

                // Putting the subject and body which have been send in the textboxes
                if(body) {
                    $(messageFieldBody).val(body);
                }
                if(subject) {
                    $(messageFieldSubject).val(subject);
                }

                if (replyOnly) {
                    $(sendmessage_to).find("label").hide();
                    $(sendmessage_subject).hide();
                    $(sendmessage_body).find("label").hide();
                }
                if (replyID) {
                    replyMessageID = replyID;
                } else {
                    replyMessageID = null;
                }

                if (buttonText) {
                    $("#send_message span").text(buttonText);
                } else {
                    $("#send_message span").text($("#sendmessage_default_button_text").text());
                }

                // Maybe we dont want to display a popup but instead want to add it in another div.
                if ($insertInId) {
                    if (!($insertInId instanceof jQuery)) {
                        $insertInId = $(insertInId);
                    }
                    // Make sure this id exists.
                    if ($insertInId.length > 0) {
                        // The id exists!
                        layover = false;

                        // Remove the dialog stuff.
                        $(dialogHeaderClass, $sendmessage_container).hide();
                        $sendmessage_container.removeClass(dialogContainerClass);
                        $(messageDialogContainer).removeClass(dialogClass.replace(/\./,''));
                        $(dialogBoxContainer).removeClass(dialogBoxClass);
                        // Altough this isnt strictly nescecary it is cleaner.
                        $rootel = $insertInId;
                        $rootel.append($(messageDialogContainer));
                        $sendmessage_form = $("#sendmessage_form", $rootel);
                        bindEvents();
                    }
                } else {
                    $rootel = $("#"+tuid);
                    $sendmessage_form = $("#sendmessage_form", $rootel);
                    bindEvents();
                }

                initAutoSuggest();
                // Store the callback
                if (callback) {
                    callbackWhenDone = callback;
                }

                // show popup
                if (layover) {
                    var dialogOptions = {
                        modal: true,
                        overlay: 20,
                        toTop: true
                    };
                    var openOptions = {
                        bindKeyboardFocusIgnoreElements: 'a.as-close'
                    };
                    sakai.api.Util.Modal.setup(messageDialogContainer, dialogOptions);
                    sakai.api.Util.Modal.open(messageDialogContainer, openOptions);
                }
                sakai.api.Util.Forms.clearValidation($sendmessage_form);
            }