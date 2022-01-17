function() {
    var sample;
    if (!Path.existsSync("./migrations")) {
      Fs.mkdirSync("./migrations");
    }
    if (!Path.existsSync("./migrations/config.js")) {
      sample = Fs.readFileSync(__dirname + "/../src/test/config.sample", "utf8");
      Fs.writeFileSync("./migrations/config.js", sample);
      return console.log("Created sample configuration. Edit migrations/config.js.");
    }
  }