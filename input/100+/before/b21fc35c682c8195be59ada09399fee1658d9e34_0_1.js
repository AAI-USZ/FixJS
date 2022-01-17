function() {
                var ul = $('ul.tweet_list');

                // If we have tweets.
                if (ul.find('li').length > 0) {
                    $('#tweet-mashup-container').show();
                    $('#tweet-mashup-fade').show();

                    ul.find('a').attr('target', '_blank');
                    var ticker = function() {
                        setTimeout(function() {
                            ul.find('li:first').animate( {marginTop: '-4em'}, 500, function() {
                                $(this).detach().appendTo(ul).removeAttr('style');
                            });
                            ticker();
                        }, 5000);
                    };
                    ticker();
                }
            }