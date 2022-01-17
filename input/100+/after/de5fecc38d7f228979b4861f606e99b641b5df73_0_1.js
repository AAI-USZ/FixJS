function() {
            var ul = $('ul.tweet_list');
            var li_elms = ul.find('li');

            // Filter out unofficial retweets
            var rt_regex = new RegExp('RT ');
            li_elms = $(li_elms).filter(function() {
                var match = rt_regex.test($(this).find('.tweet_text')[0].textContent);
                if (match) {
                    $(this).remove();
                    return true;
                }
                return false;
            });

            // If we have tweets.
            if (li_elms.length > 0) {
                $('#tweet-mashup-container').slideDown();

                ul.find('a').attr('target', '_blank');
                if (li_elms.length > 4) {
                    var ticker = function() {
                        setTimeout(function() {
                            ul.find('li:first').animate(
                                {marginLeft: '-305px'}, 500, function() {
                                    $(this).detach().appendTo(ul).removeAttr('style');
                                });
                            ticker();
                        }, 5000);
                    };
                    ticker();
                }
            }
        }