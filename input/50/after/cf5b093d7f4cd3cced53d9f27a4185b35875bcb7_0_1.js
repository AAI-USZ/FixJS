function broadCast(command, data) {
    for(var i = 0; i < clients.length; i++)
        clients[i].emit(command,data);
}