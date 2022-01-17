function (level, message, conn, isError) {
    if (this.debugging >= level) {
        if (conn)
            console.log((conn & conn.socket ? conn.socket.remoteAddress + ": " : "") + message);
        else
            console.log(message);
        
        if (isError) {
            console.trace("Trace follows");
        }
    }
}