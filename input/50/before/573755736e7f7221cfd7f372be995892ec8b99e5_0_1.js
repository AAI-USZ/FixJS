function () {
    if (this.dataListener)
        this.dataListener.close();
    if (this.dataSocket)
        this.dataSocket.end();
}