function(err, tree) {
    if (err) {
      util.error(err);
      return;
    }
    fs.writeFileSync(path.join(this.outputDir, this.getCssFilename()), tree.toCSS({ compress: true }));
    util.log('Successfully compressed CSS files');
  }