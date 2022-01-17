function(uid, callback)
    {
        /**
         * Create a random function to assign to the global scope
        */
        var magic = '__YTLiveStreams_' + uid + "_" + Math.floor(Math.random() * 1000001);

        /**
         * Apply the callback to the root object (window)
        */
        this.awaitLoadResonse(magic, callback);

        /**
         * Build the URL
        */
        var URL = "https://gdata.youtube.com/feeds/api/users/" + uid + "/live/events?v=2&alt=json-in-script&callback=" + magic;

        /**
         * Create an script element to append to the head
        */
        var re = document.createElement('script');
        re.type = 'text/javascript';
        re.async = true;
        re.src = URL;

        /**
         * Prepend the element to the head of the document.
        */
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(re, s);
    }