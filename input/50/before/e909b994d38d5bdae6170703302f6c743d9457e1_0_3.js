function() {
    if(otherplayer.length > 0)
        socket.emit("run_up",{id:player.id})
}