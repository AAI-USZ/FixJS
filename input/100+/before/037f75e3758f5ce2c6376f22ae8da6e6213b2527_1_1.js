function update_torrents() {
    var json = JSON.stringify({
        "method": "torrent-get",
        "arguments": {
            "fields": [
                "id",
                "name",
                "status",
                "leftUntilDone",
                "percentDone",
                "rateDownload",
                "rateUpload",
                "peersConnected",
                "peersGettingFromUs",
                "peersSendingToUs",
                "recheckProgress",
                "queuePosition" 
            ]
        },
        "tag": TAGNO
    });

    rpc_request(json, function(req) {
        var torrents = JSON.parse(localStorage.getItem("torrents"));
        var remTorrents = { };
        var nDLs = 0, nULs = 0;
        var badgeText = "";
        
        try {
            var rv = JSON.parse(req.responseText);
        } catch (err) {
            chrome.browserAction.setBadgeText({ "text": "err" });
            return;
        }        
        
        for (var i = 0; i < rv.arguments.torrents.length; i++) {
            var torrent = rv.arguments.torrents[i];
            var lastStatus = torrent.status;

            if (torrent.id in torrents)
                lastStatus = torrents[torrent.id].status;

            switch (torrent.status) {
                case TR_STATUS_CHECK_WAIT:  // queued to check files
                    break;
                case TR_STATUS_CHECK:  // checking files
                    break;
                case TR_STATUS_DOWNLOAD:  // downloading
                    nDLs += 1;
                    break;
                case TR_STATUS_DOWNLOAD_WAIT:  // queued
                    break;
                case TR_STATUS_SEED_WAIT: // queued to seed
                    break;
                case TR_STATUS_SEED:  // seeding
                    nULs += 1;
                    break;
                case TR_STATUS_STOPPED: // stopped
                    if (torrent.status != lastStatus && lastStatus == TR_STATUS_DOWNLOAD && torrent.leftUntilDone == 0)
                        showNotification("torrent complete", torrent.name);
                    break;
                default:
                    break;
            }
            remTorrents[torrent.id] = torrent;
        }
        
        if (nDLs < 10)
            badgeText = nDLs;
        else
            badgeText = "*";
            
        badgeText += "/";
        
        if (nULs < 10)
            badgeText += nULs;
        else
            badgeText += "*";
        chrome.browserAction.setBadgeText({ "text": badgeText });

        localStorage.setItem("torrents", JSON.stringify(remTorrents));
    });   
}