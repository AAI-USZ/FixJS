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
        } else if (response.request == "remove_rss") {
            if (response.error) {
                alert("ERROR in request " + response.request + ": " + response.error);
                return false;
            }
            window.location.replace(window.location);
        } else if (response.request == "enable_rss") {
            if (response.error) {
                alert("ERROR in request " + response.request + ": " + response.error);
                return false;
            }
            socket.send("request=get_rss_single&ID=" + response.name);
        } else if (response.request == "disable_rss") {
            if (response.error) {
                alert("ERROR in request " + response.request + ": " + response.error);
                return false;
            }
            socket.send("request=get_rss_single&ID=" + response.name);
        } else if (response.request == "add_rss_filter") {
            if (response.error) {
                console.log("ERROR in request " + response.request + ": " + response.error);
                return false;
            }
            socket.send("request=get_rss_single&ID=" + response.name);
        } else if (response.request == "remove_rss_filter") {
            if (response.error) {
                console.log("ERROR in request " + response.request + ": " + response.error);
                return false;
            }
            socket.send("request=get_rss_single&ID=" + response.name);
        } else if (response.request == "get_rss_single") {
            if (response.error) {
                console.log("ERROR in request " + response.request + ": " + response.error);
                return false;
            }
            // replace
            var ID = response.name;
            var resp = response.response;
            $("#feed_id_" + ID).replaceWith($(resp[0]));
            //var hid = $("#feed_" + ID).hasClass("hidden");
            var drop = $(resp[1]);
            $("#feed_" + ID).children().replaceWith(drop.children());
            
        } else {
            console.log("socket message:", evt.data)
        }
    }
}