function (key) {
        assert.isTrue(path.existsSync(app.options['directories'][key]));
      }