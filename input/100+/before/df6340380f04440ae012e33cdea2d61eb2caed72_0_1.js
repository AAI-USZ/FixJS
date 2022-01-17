function () {
        var userConfig = this.getUserConfig();
        if (!userConfig.username || !userConfig.password) {
            Tomahawk.log("Grooveshark Resolver not properly configured!");
            return;
        }
        Tomahawk.log("Doing Grooveshark resolver init, got credentials: " + userConfig.username );
        this.username = userConfig.username;
        this.password = userConfig.password;

        this.sessionId = window.localStorage['sessionId'];
        this.countryId = window.localStorage['countryId'];

        this.getClientIP();

        this.secret = this.spell("499pn17500pq8r20nso1613p2q264r7r");

        Tomahawk.addCustomUrlHandler( "groove", "getStreamUrl" );

        if (!this.sessionId) {
            this.getSessionId();
        } else if (!this.countryId) {
            this.getCountry();
        }

        // Testing only
//         Tomahawk.log("Getting playlist songs!");
//         this.apiCall('getPlaylistSongs', { playlistID: '64641975' }, function (xhr) {
//             Tomahawk.log("PLAYLIST RESPONSE: " + xhr.responseText );
//         });
//         this.apiCall('getSongsInfo', { songIDs: ['3GBAjY'] }, function(xhr) {
//             Tomahawk.log("GOT SONG INFO:" + xhr.responseText );
//         });
    }