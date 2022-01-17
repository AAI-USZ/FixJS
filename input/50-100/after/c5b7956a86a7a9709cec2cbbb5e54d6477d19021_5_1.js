function () {
  if (!serverListen.connected) {
    serverListen.connected = true;
    var address = server.address();
    console.log("http:" + WEB_SEP + WEB_SEP + address.address + ":" + address.port + WEB_SEP);
    console.log([
      "#",
      "(က)",
      "polpetta",
      "v" + polpetta.version,
      polpetta.root
    ].join(" "));
  }
}