function unit(name, file, raw) {
    test(name, function() {
      var contents = {
        src: readFile(file + '.bemhtml'),
        data: JSON.parse(readFile(file + '.json')),
        dst: readFile(file + '.html')
      };

      assert.equal(
        bemhtml.compile(iBem + contents.src, { devMode: true, raw: raw })
            .call(contents.data) + '\n',
        contents.dst
      );
      assert.equal(
        bemhtml.compile(iBem + contents.src, { devMode: false, raw: raw })
            .call(contents.data) + '\n',
        contents.dst
      );
    });
  }