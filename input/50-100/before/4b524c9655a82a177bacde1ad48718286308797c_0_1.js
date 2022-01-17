function () {
        if ($(this).attr("id").indexOf("start_") !== -1) {
            var name = $(this).attr("id").split("start_")[1];
            socket.send("request=start_bot&arguments=" + name);
        } else {
            var name = $(this).attr("id").split("stop_")[1];
            socket.send("request=stop_bot&arguments=" + name);
        }
    }