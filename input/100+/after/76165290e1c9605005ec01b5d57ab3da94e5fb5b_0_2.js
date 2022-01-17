function () {

        // Set css class based on the browser

        if ($.browser.msie) {

            $("body").addClass('msie');

            $("body").addClass('msie' + $.browser.version.substr(0, 1));

        }

        if ($.browser.webkit) $("body").addClass('webkit');

        if ($.browser.mozilla) $("body").addClass('mozilla');



        if ($.browser.msie && parseInt($.browser.version, 10) < 9) {

            $("label img").live("click", function () {

                $("#" + $(this).parents("label").attr("for")).focus();

                $("#" + $(this).parents("label").attr("for")).click();

            });

        }



        // Initialize color picker

        $('#textColor').colorPicker();



        $('#checkAlert').click(function () {

            alertEnabled = $('#checkAlert').is(':checked');

        });



        $('#checkVideoBroadcast').click(function () {

            var alreadyOpened;

            if (messengerMode)

                alreadyOpened = !$('#divCurrentUserVideo').is(':empty');

            else

                alreadyOpened = $('#divBroadcastVideo').length != 0;

            broadcastVideo(!alreadyOpened);

        });



        $('#fileUploadDialogButton').bind('click', function () {

            $('#fileUploadDialog').dialog(

                {

                    close: function (ev, ui) {

                        focusMessageField();

                    }

                });

        });



        $("#fileUploadDialog #uploadButton").bind('click', function () {

            var toUserId = getTargetUserId();

            var sendFileURL = 'SendFile.ashx?token=' + token + "&chatRoomId=" + chatRoomId;

            if (toUserId != null)

                sendFileURL += "&toUserId=" + toUserId;



            $.ajaxFileUpload(

                {

                    url: sendFileURL,

                    secureuri: false,

                    fileElementId: 'fileUpload',

                    dataType: 'json',

                    success: function (data, status) {

                        $('#fileUploadDialog').dialog('close');

                        if (typeof (data.error) != 'undefined') {

                            if (data.error != '') {

                                alert(data.error);

                            } else {

                                var messagePanel = getPanelByUserId(toUserId);

                                messagePanel.append($('#fileSentTemplate').jqote());

                            }

                        }

                    },

                    error: function (data, status, e) {

                        alert(e);

                    }

                }

            );

        });



        // Set default jqote tag

        $.jqotetag('*');



        // Initialize jquery ui tabs & buttons

        $("#tabs").tabs({

            tabTemplate: '<li><a href="#{href}">#{label}</a> <span class="ui-icon ui-icon-close" style="cursor:pointer">Close Tab</span></li>',

            add: function (event, ui) {

                $('#' + ui.panel.id).addClass('messages');

                updateLayout();



                $(ui.tab).next('.ui-icon-close').attr('id', "close-" + ui.panel.id);

                $('#close-' + ui.panel.id).bind('click', function () {

                    var index = $('li', $("#tabs")).index($(this).parent());

                    $(this).parent().hide();

                    $("#tabs").tabs('remove', index);

                });

            },

            select: function (event, ui) {

                activePanel = $('#' + ui.panel.id);

                activePanel.parent().stopBlink();

            },

            show: function (event, ui) {

                activePanel = $('#' + ui.panel.id);

                scrollToBottom();

                focusMessageField();

            }

        });



        if (messengerMode) {

            $('#tabs ul li').hide();

        }



        // Set default active tab

        if (!messengerMode)

            activePanel = $('#panel-room');

        else {

            $('#panel-room').attr('id', 'panel-' + messengerTargetUserId);

            activePanel = $('#panel-' + messengerTargetUserId);

        }



        // Prepare the text formatting buttons

        $("#formatButtons").buttonset();



        $('#checkAlert').button();

        $('#checkVideoBroadcast').button();



        //gives focus back to the message input field when a button is clicked

        $("#button-panel input, .color_picker_wrap, #color_selector, #button-panel select>option").each(function () { $(this).click(function () { focusMessageField(); }); });

        $("#button-panel select").each(function () {

            $(this).blur(function () { focusMessageField(); });

            $(this).change(function () { focusMessageField(); });

        });

        $('#button-panel select>option').each(function () { $(this).mousedown(function () { focusMessageField(); }); });



        // Update the layout

        updateLayout();

        $(window).resize(function () {

            updateLayout();

        });



        // Attach the send button handlers

        $("#sendButton").click(function () {

            sendMessage();

            return false;

        });



        // Catch the enter button on the new message textbox

        var $messageInput = $("#messageInput");

        $messageInput.keypress(function (event) {

            if (event.keyCode == 13) {

                event.preventDefault();

                sendMessage();

                return false;

            }

        });



        // set up emoticons drop down

        createEmoticonList($('.emoticons-container'));

        var $emoticonSelect = $('.emoticons-container select')

        $emoticonSelect.msDropDown({ visibleRows: '12' });

        $('#emoticon-list_child').click(function () {

            $messageInput.val($messageInput.val() + $emoticonSelect.val());

        });



        // Get chat room id from parameter

        if (!messengerMode) {

            if ($.urlParam('roomId') != null)

                chatRoomId = $.urlParam('roomId');

        } else {

            //messenger room id is -2. All conversation inside the room should be private

            chatRoomId = -2;

        }



        // Configure alert popup for errors

        $.ajaxSetup({

            error: function (req, status, error) {

                if (console && console.log)

                    console.log(status + ' - ' + req.responseText);

            }

        });



        // Try to join the chat room

        $.ajax({

            type: "POST",

            url: "ChatEngine.svc/JoinChatRoom",

            data: '{"chatRoomId":"' + chatRoomId + '", "href":"' + window.location.href.replace(/'/g, "\'").replace(/\\/g, "\\\\") + '"}',

            contentType: "application/json; charset=utf-8",

            dataType: "json",

            success: function (msg) {

                joinChatRoomSuccess(msg.d);

            }

        });

    }