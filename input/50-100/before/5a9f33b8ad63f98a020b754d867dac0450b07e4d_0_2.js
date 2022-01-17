function() {
        var result;
        result = _this.getItemSync(documentNumber);
        return callback(null, _this, result);
      }