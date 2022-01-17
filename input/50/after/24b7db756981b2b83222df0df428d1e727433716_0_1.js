function(err, data) {
      // check existance
      var filepath = path.join(__dirname, data.filename);
      assert.isTrue(existsSync(filepath));

      // delete file after each test
      fs.unlinkSync(filepath);
    }