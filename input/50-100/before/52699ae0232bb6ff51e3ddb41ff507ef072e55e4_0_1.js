function (event) {
    var msg = JSON.parse(event.data);
    self.postMessage("Worker received command: " + msg.command);
    if (msg.command == "start_download") {
        var t_id = msg.content.torrent_id;
        self.postMessage("Worker got torrent_id: " + t_id);
        sock.send(torrent_id);
    }
}