function() {

  var outbound = nss();

  //
  //
  //
  outbound.ondata(message1, function () {
    outbound.send(message2, { "foo": "bar" });
  });

  outbound.connect(6785);

}