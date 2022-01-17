function() {
        assert.deepEqual(Buffer.concat(chunks), fs.readFileSync('test/files/folder/Alice-white-rabbit.jpg'));
        done();
      }