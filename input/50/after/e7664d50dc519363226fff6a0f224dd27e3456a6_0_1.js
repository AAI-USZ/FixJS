function (key) {
        assert.isTrue((fs.existsSync || path.existsSync)(app.options['directories'][key]));
      }