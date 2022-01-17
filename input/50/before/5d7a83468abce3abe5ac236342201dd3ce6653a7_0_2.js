function(module, filename) {
      var content;
      content = compile(stripBOM(fs.readFileSync(filename, 'utf8'), {
        filename: filename
      }));
      return module._compile(content, filename);
    }