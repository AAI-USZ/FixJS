function() {
            // Check if images exist
            if ($('.flickrRow').length === 0) {
                // No images, don't display tweets either.
                return;
            }
            flickr_mashup.slideDown();

            $('#tweet-mashup').tweet({
                query: $('#tweet-mashup').data('hashtag'),
                page: 1,
                avatar_size: 32,
                count: 20,
                loading_text: 'fetching tweets ...'
            }).bind('loaded', function() {
                var ul = $('ul.tweet_list');

                // If we have tweets.
                if (ul.find('li').length > 0) {
                    $('#tweet-mashup-container').fadeIn();
                    $('#tweet-mashup-fade').fadeIn();

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
            });
        }