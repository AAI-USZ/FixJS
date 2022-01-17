function unit(name, file) {
    test(name, function() {
      var contents = {
        src: readFile(file + '.bemhtml'),
        data: JSON.parse(readFile(file + '.json')),
        dst: readFile(file + '.html')
      };

      assert.equal(
        bemhtml.compile(iBem + contents.src, { devMode: true })
            .call(contents.data) + '\n',
        contents.dst
      );
      assert.equal(
        bemhtml.compile(iBem + contents.src, { devMode: false })
            .call(contents.data) + '\n',
        contents.dst
      );
    });
  }