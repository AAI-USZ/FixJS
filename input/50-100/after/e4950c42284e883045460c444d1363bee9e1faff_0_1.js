function () {
        var name = $(this).closest(".remote_setting").attr("id").split("remote_settings_")[1];
        var index = $(".filter", $(this).parent()).index($(this));
        console.log("index is", index);
        //var c = confirm("Are you sure you want to remove this filter?");
        //if (c) {
        //    socket.send("request=remove_filter&name=" + name + "&index=" + index);
        //}
    }