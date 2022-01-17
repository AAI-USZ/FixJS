function onMessage (evt) {
    if (evt.data.indexOf("ERROR") === 0) {
        console.log(evt.data);
        socket.close();
    } else {
        var response = JSON.parse(evt.data);
        if (response.request == "get_rss") {
            if (response.error) {
                console.log("ERROR in request " + response.request + ": " + response.error);
                return false;
            }
            runPostInit(response.response);
        } else if (response.request == "add_rss") {
            if (response.error) {
                alert("ERROR in request " + response.request + ": " + response.error);
                return false;
            }
            window.location.replace(window.location);
        } else {
            console.log("socket message:", evt.data)
        }
    }
}