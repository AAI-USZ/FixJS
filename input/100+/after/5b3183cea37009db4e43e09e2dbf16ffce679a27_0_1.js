function Uba() {

    var that = this;

    $('.right-section .chat-button').live('click', function () {

        var user = onlineUsers[that.userId];



        if (user.Gender == 2) {

            that._stopChat();

            document.location.href = '/';

        } else {

            that._closeChat(

            '<div class="no-credits">' +

                '<p>Thank you for using the Ukraine Brides Agency live chatting system.</p>' +

                '<p>Perhaps you might like to follow up this chat in the following ways:</p>' +

                '<ul><li><a href="' + that._ubaAbsoluteUrl('/Messages/Create') + '">send her a thank-you message</a></li>' +

                '<li><a href="' + that._ubaAbsoluteUrl('/Gifts') + '">send her a gift</a></li>' +

                '<li><a href="' + that._ubaAbsoluteUrl('/Meeting') + '">organise to meet her</a></li>' +

                '<li><a href="' + that._ubaAbsoluteUrl('/ChatOnline') + '">book your next live chat</a></li>' +

                '<li><a href="' + that._ubaAbsoluteUrl('/GetCredits') + '">purchase more credits</a></li></ul>' +

                '<p>If you have any feedback to give about the chat, feel free to send your thoughts to us via our contact form on the website.</p>' +

                '<p><a href="' + that._ubaAbsoluteUrl('/') + '">Go back to www.ukrainebridesagency.com</a></p>' + 

            '</div>');

        }

    });

    

    this.UserConnected = function () {

        this.StartCreditsRemainingPoll();

    };



    this.UserDisconnected = function () {

        var user = onlineUsers[this.userId],

            closeChatTemplate =

            '<div class="no-credits">' +

                '<p>' + this.target + ' has left the chat.</p>' +

                (user.Gender == 2

                    ? ('<a href="' + this._ubaAbsoluteUrl('/Profile/ControlPanel') + '" class="chat-button">OK</a>')

                    : ('<p>Thank you for using the Ukraine Brides Agency live chatting system.</p>' +

                        '<p>Perhaps you might like to follow up this chat in the following ways:</p>' +

                        '<ul><li><a href="' + this._ubaAbsoluteUrl('/Messages/Create') + '">send her a thank-you message</a></li>' +

                        '<li><a href="' + this._ubaAbsoluteUrl('/Gifts') + '">send her a gift</a></li>' +

                        '<li><a href="' + this._ubaAbsoluteUrl('/Meeting') + '">organise to meet her</a></li>' +

                        '<li><a href="' + this._ubaAbsoluteUrl('/ChatOnline') + '">book your next live chat</a></li>' +

                        '<li><a href="' + this._ubaAbsoluteUrl('/GetCredits') + '">purchase more credits</a></li></ul>' +

                        '<p>If you have any feedback to give about the chat, feel free to send your thoughts to us via our contact form on the website.</p>' +

                        '<p><a href="' + this._ubaAbsoluteUrl('/Member/' + this.target) + '">Go back to www.ukrainebridesagency.com</a></p>')) +

            '</div>';

        this._closeChat(closeChatTemplate);

    };



    this.StartCreditsRemainingPoll = function () {

        this._refreshCreditsRemaining()



        var that = this;

        // start subtracting credits from the guy every minute

        clearTimeout(this.creditsRemainingId);

        this.creditsRemainingId = setTimeout(function () {

            that.StartCreditsRemainingPoll();

        }, 5000);

    };



    this._refreshCreditsRemaining = function () {

        var usernames = [];

        usernames.push(this.userId);

        usernames.push(this.target);



        var that = this;

        $.ajax({

            url: that._ubaAbsoluteUrl("/chat/ChatEngine.svc/GetCreditsRemaining"),

            type: "POST",

            data: JSON.stringify({

                usernames: usernames

            }),

            contentType: "application/json; charset=utf-8",

            dataType: 'json',

            success: function (data) {

                var creditsRemaining = data.d;

                if (creditsRemaining != null) {

                    if (creditsRemaining < 6) {

                        if (creditsRemaining === 0) {

                            // close chat in 1 minute if they have previously been chatting. If they haven't been 

                            // chatting previously, they somehow got to this page incorrectly, their credits are 

                            // 0 so chat should immediately be closed

                            var user = onlineUsers[that.userId],

                                closeChatTemplate =

                                '<div class="no-credits">' +

                                    (user.Gender == 2

                                        ? ('<p>Sorry, it seems that ' + that.target + ' has run out of credits. You will be unable to chat with him until he purchases more.</p>' +

                                            '<form action="' + this._ubaAbsoluteUrl('/Profile/ControlPanel') + '" method="get"><input type="submit" value="OK" /></form>')

                                        : ('<p>Sorry, you do not have enough credits to continue this online chat.<br />' +

                                            '<a href="' + that._ubaAbsoluteUrl('/GetCredits') + '">Click here to purchase more credits</a></p>' +

                                            '<p>After you have added more credits your account, perhaps you might like to follow up this chat in the following ways:</p>' +

                                            '<ul><li><a href="' + that._ubaAbsoluteUrl('/Messages/Create') + '">send her a thank-you message</a></li>' +

                                            '<li><a href="' + that._ubaAbsoluteUrl('/Gifts') + '">send her a gift</a></li>' +

                                            '<li><a href="' + that._ubaAbsoluteUrl('/Meeting') + '">organise to meet her</a></li>' +

                                            '<li><a href="' + that._ubaAbsoluteUrl('/ChatOnline') + '">book your next live chat</a></li>' +

                                            '<li><a href="' + that._ubaAbsoluteUrl('/GetCredits') + '">purchase more credits</a></li></ul>' +

                                            '<p>Thank you for using the Ukraine Brides Agency live chatting system. If you have any feedback to give about the chat, feel free to send your thoughts to us via our contact form on the website.</p>')) +

                                '</div>';

                            if (that.haveBeenChatting) {

                                setTimeout(

                                    $.proxy(function () {

                                        that._closeChat(closeChatTemplate);

                                    }, that)

                                , 60000);

                            } else {

                                var closeNow = $.proxy(function () {

                                    that._closeChat(closeChatTemplate);

                                }, that);

                                closeNow();

                            }

                        } else if (!that.warningShown) {

                            that.warningShown = true;



                            // tell them that their chat will finish soon

                            $('#dialog-container')

                                .text('Please note: you only have 5 more credits remaining. Purchase more credits to continue chatting :)')

                                .dialog('open');

                            // style the credits remaining label appropriately

                            $('#remaining-credits-label').addClass('almost-finished');

                        }

                    }



                    that.haveBeenChatting = true;

                    $('#remaining-credits-label span').text(creditsRemaining);

                }

            }

        });

    };



    this._closeChat = function (template) {

        // replace the window's content where the only thing they can do is close the window

        $('.content').html(template);

        $('#footer').remove();



        this._stopChat();

    };



    this._stopChat = function () {

        // stop checking credits remaining

        clearTimeout(this.creditsRemainingId);



        // make user leave chatroom

        $.ajax({

            type: "POST",

            url: this._ubaAbsoluteUrl("/chat/ChatEngine.svc/LeaveChatRoom"),

            data: '{"chatRoomId":"' + this.chatRoomId + '", "token":"' + this.token + '", "messengerTargetUserId":' + '"' + this.target + '"}',

            contentType: "application/json; charset=utf-8",

            dataType: "json"

        });



        // close any dialog that may be open

        $('#dialog-container').dialog('close');



        // make it so the beforeunload message doesn't appear

        $(window).unbind('beforeunload');



        // stop listening for new chat events

        stopEventsTimer();

    };



    this._ubaAbsoluteUrl = function (absoluteUrl) {

        if (document.location.hostname === "localhost") {

            absoluteUrl = '/ukrainebridesagency' + absoluteUrl;

        }



        return absoluteUrl;

    };



    return true;

}