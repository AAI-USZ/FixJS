function joinChatRoomSuccess(result) {

    if (result.Error != null) {

        $.alert("Unable to join room!", result.Error);



        // Redirect to login url if requested

        if (result.RedirectUrl != null) {

            window.location.href = result.RedirectUrl;

        }

        return;

    }



    // Save user token

    token = result.Token;

    userId = result.UserId;

    isAdmin = result.IsAdmin;

    fileTransferEnabled = result.FileTransferEnabled;

    videoChatEnabled = result.VideoChatEnabled;

    flashMediaServer = result.FlashMediaServer;



    if (videoChatEnabled)

        $('#webcamdetector').append($('#webcamDetectorTemplate').jqote());



    (!videoChatEnabled || !webcamdetected) ? $("#videoBroadcastButtonContainer").hide() : $("#videoBroadcastButtonContainer").show();

    (!fileTransferEnabled) ? $("#fileUploadDialogButton").hide() : $("#fileUploadDialogButton").show();





    startEventsTimer();



    // Set window unload events

    $(window).bind('beforeunload', function() {

        return 'Do you really want to exit the chat?';

    });

    $(window).bind('unload', function() {

        if (!kicked) {

            $.ajax({

                type: "POST",

                url: "ChatEngine.svc/LeaveChatRoom",

                data: '{"chatRoomId":"' + chatRoomId + '", "token":"' + token + '", "messengerTargetUserId":'

                + (messengerMode ? '"' + messengerTargetUserId + '"' : 'null') + '}',

                contentType: "application/json; charset=utf-8",

                dataType: "json"

            });

        }

    });



    // Save the online users data

    for (var i = 0; i < result.Users.length; i++) {

        var user = result.Users[i];

        onlineUsers[user.Id] = user;

    }



    // Save broadcasts

    for (var i = 0; i < result.Broadcasts.length; i++) {

        if (onlineUsers[result.Broadcasts[i].Key] != undefined) {

            onlineUsers[result.Broadcasts[i].Key].Guid = result.Broadcasts[i].Value;

        }

    }



    // Prepare the online users list

    updateOnlineUsers();



    if (!messengerMode) {

        // Set chat room name to first tab

        $('#tabs ul li:first a').text(result.ChatRoomName);



        // Print initial messages

        outputSystemMessage("Connected!");

        outputSystemMessage(result.ChatRoomTopic);

    } else {

        // add messenger users

        uba.chatRoomId = chatRoomId;

        uba.userId = userId;

        uba.target = messengerTargetUserId;

        uba.token = token;



        if (messengerIsInitiator && location.hash != 'connected' /*onlineUsers[messengerTargetUserId] == undefined*/) {

            outputSystemMessage("Awaiting other user to accept the chat request...");



            // man has sent a request - show his current credits

            uba.StartCreditsRemainingPoll();

        } else {

            outputSystemMessage("Connected!");

            imUserCanSendMessages = true;

            location.hash = 'connected';



            // a lady has accepted a chat request

            uba.UserConnected();



            // start the video broadcasting

            setTimeout(function () {

                $('#checkVideoBroadcast').click();

            }, 1000);

        }

    }

}