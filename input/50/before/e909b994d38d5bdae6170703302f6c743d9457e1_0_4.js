function() {
    if(otherplayer.length > 0)
        socket.emit("run_down",{id:player.id})
}