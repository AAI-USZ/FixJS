function () {
        if (self._ended) return;
        self.proto = self._createProto();
        self.proto.start();
    }