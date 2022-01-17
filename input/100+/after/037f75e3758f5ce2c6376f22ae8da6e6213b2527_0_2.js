function update(event) {
    if (localStorage.getItem("lastStatus") != 200) {
        var msg = '';
        msg += '<div><span class="error">Unable to contact Transmission server ';
        msg += localStorage.getItem("rpcURL");
        msg += '<br /><a href="' + chrome.extension.getURL("../html/options.html") +'" target="_blank">';
        msg += 'go to the options page</a></span></div>';
        $("body").html(msg);
    }
    else if (typeof event == "undefined") {
        buildList();
        updateSpeed();
        updateTurtle();
    }
    else if (event.key == "torrents") {
        buildList();
    }
    else if (event.key == "session-stats") {
        updateSpeed();
    }
    else if (event.key == "session-info") {
        updateTurtle();
    }
}