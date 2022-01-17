function() {
    var sample;
    if (!existsSync("./migrations")) {
      Fs.mkdirSync("./migrations");
    }
    if (!existsSync("./migrations/config.js")) {
      sample = Fs.readFileSync(__dirname + "/../src/test/config.sample", "utf8");
      Fs.writeFileSync("./migrations/config.js", sample);
      return console.log("Created sample configuration. Edit migrations/config.js.");
    }
  }