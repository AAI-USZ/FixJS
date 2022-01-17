function () {
    options = options || {};
    options.baudRate = options.baudRate || options.baudrate || 9600;
    options.dataBits = options.dataBits || options.databits || 8;
    options.parity = options.parity || 'none';
    options.stopBits = options.stopBits || options.stopbits || 1;
    options.bufferSize = options.bufferSize || options.buffersize || 100;
    if (!('flowControl' in options)) {
      options.flowControl = false;
    }
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
    }

    SerialPortBinding.open(path, options, function (err, fd) {
      self.fd = fd;
      self.readStream = fs.createReadStream(path, { bufferSize: options.bufferSize, fd: fd });
      self.readStream.on("data", options.dataCallback);
      self.readStream.on("error", options.errorCallback);
      self.readStream.on("close", function () {
        self.close();
      });
      self.readStream.on("end", function () {
        self.emit('end');
      });
      if (err) {
        return self.emit('error', err);
      }

      self.emit('open');
    });
  }