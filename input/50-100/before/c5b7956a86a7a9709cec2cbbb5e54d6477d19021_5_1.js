function () {
  if (!serverListen.connected) {
    serverListen.connected = true;
    var address = server.address();
    console.log("http://" + address.address + ":" + address.port + "/");
    console.log([
      "#",
      "(က)",
      "polpetta",
      "v" + polpetta.version,
      polpetta.root
    ].join(" "));
  }
}