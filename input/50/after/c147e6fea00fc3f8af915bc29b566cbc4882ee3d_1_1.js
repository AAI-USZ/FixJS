function() {
        assert.deepEqual(Buffer.concat(chunks), imgBuf);
        done();
      }