function() {

  var outbound = new nssocket.NsSocket();

  //
  // 
  //
  outbound.data(message1, function () {
    outbound.send(message2, { "foo": "bar" });
  });

  outbound.connect(6785);
  
}