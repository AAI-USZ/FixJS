function (event) {
    var msg = JSON.parse(event.data);
    parentSend("Worker received command: " + msg.command);
    if (msg.command == "start_download") {
        var t_id = msg.content.torrent_id;
        parentSend("Worker got torrent_id: " + t_id);
        if (SOCKOPEN) {
            sockSend(t_id);
        } else {
            setTimeout(sockSend, 1000, t_id);
        }
    }
}