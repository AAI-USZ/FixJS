function (commandArg) {
    // Get the feature list implemented by the server. (RFC 2389)
    wwenc(this.socket,
          "211-Features\r\n" +
          " SIZE\r\n" +
          (!this.options.tlsOptions ? "" :
           " AUTH TLS\r\n" +
           " PBSZ\r\n" +
           " PROT\r\n") +
          "211 end\r\n");
}