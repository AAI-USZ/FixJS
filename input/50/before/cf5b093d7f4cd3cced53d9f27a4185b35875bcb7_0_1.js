function broadCast(command, data) {
    if(clients[0])
    clients[0].emit(command,data);
    if(clients[1])
    clients[1].emit(command,data);
}