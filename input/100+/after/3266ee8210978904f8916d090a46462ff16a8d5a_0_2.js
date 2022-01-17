function(user){
        var el = $(this);
        el.html('Loading latest tweet&hellip;');
        var request = $.ajax({
            url: 'https://api.twitter.com/1/statuses/user_timeline.json?screen_name='+ user +'&count=1',
            dataType: 'jsonp',
            timeout: 5000
        });
        request.done(function(data){
            // result returned
            var tweet = data[0].text;
    
            tweet = tweet
            // process links
            .replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '<a href="$1">$1</a>')
            // process usernames
            .replace(/(^|\s)@(\w+)/g, '$1<a href="http://www.twitter.com/$2">@$2</a>')
            // process hashes
            .replace(/(^|\s)#(\w+)/g, '$1#<a href="http://search.twitter.com/search?q=%23$2">$2</a>');
    
            var fulldate = data[0].created_at,
            date = prettyDate(fulldate) || fulldate.substring(4,10),
            dateText = '<br /> <abbr title="' + fulldate + '">' + date + '</abbr>';

            tweet = tweet + dateText;
    
            // output the result
            el.html(tweet);
        });

        request.fail(function(data){
            el.html("I'm sorry but there seems to have been an error retrieving the latest tweet. Please try again later.");
        });
    }