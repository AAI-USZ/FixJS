function () {

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

    }