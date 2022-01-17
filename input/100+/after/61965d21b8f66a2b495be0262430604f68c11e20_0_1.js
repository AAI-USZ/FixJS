function load_recorder(type) {
    // Create a YUI instance using io-base module.
    YUI().use('node', 'io-base', function(Y) {
        var uri = decodeURIComponent(Y.one('#ajax_uri').get('value'));
        var applet = Y.one('#appletcontainer');
        // Define a function to handle the response data.
        function complete(id, o) {
            var id = id; // Transaction ID.
            var data = o.responseText; // Response data.
            applet.setContent(data);
        };

        // Subscribe to event "io:complete"
        Y.on('io:complete', complete, Y);

        // Make an HTTP POST request to posturl.
        cfg = {
            method: 'POST',
            data: 'type='+type+
                    '&java='+BrowserPlugins.java+
                    '&flash='+BrowserPlugins.flash+
                    '&quicktime='+BrowserPlugins.quicktime+
                    '&os='+BrowserDetect.OS,
        };

        var request = Y.io(uri, cfg);
    });

    return false;
}