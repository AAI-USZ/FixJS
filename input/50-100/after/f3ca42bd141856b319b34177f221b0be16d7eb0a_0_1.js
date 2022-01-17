function(fileName) {
    if (fs.existsSync(path.join(options.resources, fileName))) {
      return path.join(options.resources, fileName);
    } else {
      return path.resolve(__dirname, path.join('../resources', fileName));
    }
  }