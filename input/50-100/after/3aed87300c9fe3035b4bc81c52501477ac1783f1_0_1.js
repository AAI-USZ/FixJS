function () {
        if (self._ended) return;
        self.proto = self._createProto();
        self.proto.start();
        
        (self._handleQueue || []).forEach(function (row) {
            self.handle(row);
        });
    }