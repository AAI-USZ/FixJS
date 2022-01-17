function() {

  if (!path.existsSync(this.file)) {
    try {
      var defaultFile = fs.readFileSync(this.defaultConfig);
      // Parse it to make sure there are no errors
      defaultFile = JSON.stringify(JSON.parse(defaultFile), true);
      fs.writeFileSync(this.file, defaultFile);
    } catch (ex) {
      return ex.message;
    }
    return;
  } else {
    return;
  }

}