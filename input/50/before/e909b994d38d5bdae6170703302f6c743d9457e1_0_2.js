function() {
    if(otherplayer.length > 0)
        socket.emit("run_left",{id:player.id})
}