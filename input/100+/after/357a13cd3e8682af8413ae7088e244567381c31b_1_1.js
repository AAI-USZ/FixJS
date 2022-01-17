function () {
        var inputs = new Array();
        var alias = $("#alias").val();
        var err = null;
        if (!alias) {
            $("#alias").addClass("error");
            err = true;
        }
        var ttl = $("#ttl").val();
        if (!ttl) {
            $("#ttl").addClass("error");
            err = true;
        }
        var url = $("#url").val();
        if (!url) {
            $("#url").addClass("error");
            err = true;
        } else {
            url = encodeURIComponent(url);
        }
        if (err) {
            return false;
        } else {
            socket.send("request=add_rss&alias=" + alias + "&ttl=" + ttl + "&uri=" + url)
        }
    }