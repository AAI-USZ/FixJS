function(err, data) {
      // check existance
      var filepath = path.join(__dirname, data.filename);
      assert.isTrue(fs.existsSync(filepath));

      // delete file after each test
      fs.unlinkSync(filepath);
    }