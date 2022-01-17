function initialize_mashup() {
    // Setup flickr and twitter mashups.
    //
    // We first fetch photos from flickr and randomize them, so on
    // each page load users see a different set of photos. If we have
    // photos we also try to load related tweets.
    //
    var flickr_mashup = $('#flickr-mashup');
    var tweet_mashup = $('#tweet-mashup');
    var hashtag = flickr_mashup.data('hashtag');
    if (hashtag) {
        flickr_mashup.flickrfeed('', flickr_mashup.data('hashtag').substr(1), {
            limit: 20,
            title: false,
            date: false,
            header: false,
            randomize: true
        }).bind('loaded', function() {
            // Check if images exist
            if ($('.flickrRow').length === 0) {
                // No images, don't display tweets either.
                return;
            }
            flickr_mashup.slideDown();
        });

        tweet_mashup.tweet({
            query: tweet_mashup.data('hashtag'),
            page: 1,
            avatar_size: 32,
            count: 20,
            retweets: false
        }).bind('loaded', function() {
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
        });
    }
}