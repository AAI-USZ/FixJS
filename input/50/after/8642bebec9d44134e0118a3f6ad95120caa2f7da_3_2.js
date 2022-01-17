function (socket) {

  //
  // Here `socket` will be an instance of `NsSocket`.
  // When there is a connection, send `message1` to the socket.
  //
  socket.send(message1);

  //
  // listen for `message2` from the connecting socket.
  //
  socket.ondata(message2, function (data) {

    //
    // If this callback is called, we know that the socket
    // speaks our language, we will likely be provided with
    // a payload. In this case `{ "foo": "bar" }`.
    //
    console.log(data);
  });

}