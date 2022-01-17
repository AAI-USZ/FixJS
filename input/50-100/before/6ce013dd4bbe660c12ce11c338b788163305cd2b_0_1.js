function(er, st) {
      if (er) return callback(er);
      size = st.size;
      if (size === 0) {
        buffer = new Buffer(0);
        return afterRead(null, 0);
      }

      buffer = new Buffer(size);
      read();
    }