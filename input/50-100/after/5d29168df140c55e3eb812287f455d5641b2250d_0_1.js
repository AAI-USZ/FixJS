function() {
        // initialize the plugin
        $.htmlhistory.init({
            useHistory: true,
            useHashchange: true,
            poll: 250,
            interceptLinks: true,
            disableHashLinks: true,
            triggerOnLoad: true,
            hash: '#!'
        });
        // bind the 'htmlhistory' event to the window
        $(window).bind('htmlhistory', onURL);
    }