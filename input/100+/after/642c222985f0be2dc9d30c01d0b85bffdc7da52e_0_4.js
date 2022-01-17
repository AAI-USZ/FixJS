function (commandArg) {
    if (commandArg == "I" || commandArg == "A")
        wwenc(this.socket, "200 OK\r\n");
    else
        wwenc(this.socket, "202 Not supported\r\n");
}