function () {
        var ID = $(this).parents(".remote_setting").attr("id").split("feed_")[1];
        var newf = $(this).parent().next();
        var newfval = newf.val()
        if (!newfval) {
            newf.focus();
            return false;
        }
        socket.send("request=add_rss_filter&ID=" + ID + "&restring=" + encodeURIComponent(newfval));
    }