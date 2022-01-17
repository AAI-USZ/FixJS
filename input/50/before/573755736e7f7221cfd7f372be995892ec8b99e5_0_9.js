function () {
    logIf(1, "Connection", this);
    wwenc(this.socket, "220 FTP server (nodeftpd) ready\r\n");
}