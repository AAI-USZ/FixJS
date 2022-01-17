function() {
    if(otherplayer.length > 0)
        socket.emit("run_right",{id:player.id})
}