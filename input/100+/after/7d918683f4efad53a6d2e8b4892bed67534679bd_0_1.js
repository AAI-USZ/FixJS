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
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth(); //January is 0!
        if(mm == 0){
            mm = 11;
        }

        var yyyy = today.getFullYear();
        if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} var today = yyyy+'-'+mm+'-'+dd;
        
        var URL = "https://gdata.youtube.com/feeds/api/users/" + uid + "/live/events?v=2&alt=json-in-script&max-results=50&starts-after=" +  today + "&callback=" + magic;

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