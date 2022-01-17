function(chport) {
    
    if( chport.name !== "buffer-embed" ) return;

    var port = PortWrapper(chport);
    var index = ports.push(port);
    var tab = port.raw.sender.tab;

    port.emit('buffer_options', localStorage);
    
    // Listen for embedded triggers
    port.on("buffer_click", function (embed) {
        attachOverlay({tab: tab, embed: embed}, function (overlaydata) {
            if( !!overlaydata.sent ) {
                // Buffer was sent
                port.emit("buffer_embed_clear");
            }
        });
    });

    // Listen for a request for scraper data
    port.on("buffer_details_request", function () {
        overlayPort = port;
        if( scraperPort ) {
            scraperPort.emit("buffer_details_request");
        }
    });

    port.on("buffer_details", function (data) {
        if( overlayPort ) overlayPort.emit("buffer_details", data);
    });

    port.on("buffer_register_scraper", function () {
        scraperPort = port;
    });

}