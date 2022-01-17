function (data) {

    //
    // If this callback is called, we know that the socket
    // speaks our language, we will likely be provided with
    // a payload. In this case `{ "foo": "bar" }`.
    //
    console.log(data);
  }