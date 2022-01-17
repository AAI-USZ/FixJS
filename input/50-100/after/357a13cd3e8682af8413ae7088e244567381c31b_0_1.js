function () {
        var inputval = $(this).parent().next().val();
        var name = $(this).closest(".remote_setting").attr("id").split("remote_settings_")[1];
        if (inputval) {
            socket.send("request=add_filter&name=" + name + "&restring=" + encodeURIComponent(inputval));
        }
    }