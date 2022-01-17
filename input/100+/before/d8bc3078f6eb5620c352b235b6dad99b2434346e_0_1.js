function () {
    options = options || {};
    options.baudRate = options.baudRate || 9600;
    options.dataBits = options.dataBits || 8;
    options.parity = options.parity || 'none';
    options.stopBits = options.stopBits || 1;
    if (!('flowControl' in options)) {
      options.flowControl = false;
    }
    options.bufferSize = options.bufferSize || 100;
    options.dataCallback = function (data) {
      options.parser(self, data);
    };
    options.errorCallback = function (err) {
      self.emit('error', err);
    };
    options.disconnectedCallback = function () {
      self.emit('error', new Error("Disconnected"));
      self.close();
    };

    if (process.platform == 'win32') {
      path = '\\\\.\\' + path;
    } else {
      self.readStream = fs.createReadStream(path, { bufferSize: options.bufferSize });
      self.readStream.on("data", options.dataCallback);
      self.readStream.on("error", options.errorCallback);
      self.readStream.on("close", function () {
        self.close();
      });
      self.readStream.on("end", function () {
        self.emit('end');
      });
    }

    SerialPortBinding.open(path, options, function (err, fd) {
      self.fd = fd;
      if (err) {
        return self.emit('error', err);
      }

      self.emit('open');
    });
  }