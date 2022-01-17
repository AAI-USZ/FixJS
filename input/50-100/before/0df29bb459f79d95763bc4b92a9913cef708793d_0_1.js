function (data) {
    if (self.closed) return;
    //if (data.device) data.device = "/agpsd";
    data = JSON.stringify(data) + ";\r\n";
    console.log("S>" + data + "<");
    self.stream.write(data, function (err) {
      if (err) {
        console.error(err);
        self.stream.emit("end");
      }
    });
  }