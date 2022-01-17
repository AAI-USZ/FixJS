function(err, styles) {
        should.not.exist(err);
        styles.should.match(/<link rel=\"stylesheet\" title=\"\/test2\.css\" href=\"\/test2\.css\"\/>\r\n<link rel=\"stylesheet\" title=\"\/test1\.css\" href=\"\/test1\.css\"\/>/);
        done();
      }