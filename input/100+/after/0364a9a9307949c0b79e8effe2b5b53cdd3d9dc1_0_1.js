function (elem) {
                var c = $(elem).closest('.tweet');
                // Grab the tweet text
                var text = c.find('.js-tweet-text').first();
                // Iterate through all links in the text
                $(text).children('a').each(function () {
                    // Don't modify the screenames and the hastags
                    if( $(this).attr('data-screen-name') ) return;
                    if( $(this).hasClass('twitter-atreply') ) return;
                    if( $(this).hasClass('twitter-hashtag') ) return;
                    // swap the text with the actual link
                    var original = $(this).text();
                    $(this).text($(this).attr("href")).attr('data-original-text', original);
                });
                // Build the RT text
                var rt = 'RT ' + c.find('.username').first().text().trim() + ': ' + $(text).text().trim() + '';
                // Put the right links back
                $(text).children('a').each(function () {
                    if( ! $(this).attr('data-original-text') ) return;
                    $(this).text($(this).attr('data-original-text'));
                });
                // Send back the data
                return {
                    text: rt,
                    placement: 'twitter-permalink'
                }
            }