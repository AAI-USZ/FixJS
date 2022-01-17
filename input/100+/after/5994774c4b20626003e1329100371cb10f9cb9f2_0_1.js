function(err, tree) {
    if (err) {
      var message = 'CSS ' + err.type + ' Error: ' + err.message;
      if (err.extract && err.extract.length) {
        for (var i = 0, l = err.extract.length; i < l; i++) {
          message += '\n  ' + err.extract[i];
        }
      }
      util.error(message);
      return;
    }
    fs.writeFileSync(path.join(this.outputDir, this.getCssFilename()), tree.toCSS({ compress: true }));
    util.log('Successfully compressed CSS files');
  }