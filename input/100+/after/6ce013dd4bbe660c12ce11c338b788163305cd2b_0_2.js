function(er) {
      if (size === 0) {
        // collected the data into the buffers list.
        buffer = Buffer.concat(buffer.length, pos);
      }

      if (encoding) buffer = buffer.toString(encoding);
      return callback(er, buffer);
    }