function(migration, which) {
    var filename;
    filename = migrationFile(migration, which);
    if (Path.existsSync(filename)) {
      return Fs.readFileSync(filename, "utf8");
    } else {
      return "";
    }
  }