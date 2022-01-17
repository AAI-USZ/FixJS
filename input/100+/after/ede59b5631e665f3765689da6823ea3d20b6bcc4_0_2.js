function(suffix, options) {
      var filename, path;
      if (!existsSync(Path.resolve("migrations"))) {
        console.error("ERROR migrations directory not found. Try `mygrate init`");
        process.exit(1);
      }
      if (typeof suffix !== "string") {
        console.error("Migration identifier missing");
        process.exit(1);
      }
      filename = timestamp();
      if (typeof suffix === "string") {
        filename += "-" + suffix;
      }
      path = "./migrations/" + filename;
      if (!existsSync(path)) {
        Fs.mkdirSync(path);
        Fs.writeFileSync(path + "/up.sql", "");
        Fs.writeFileSync(path + "/down.sql", "");
        return console.log("Migration created: " + path);
      }
    }