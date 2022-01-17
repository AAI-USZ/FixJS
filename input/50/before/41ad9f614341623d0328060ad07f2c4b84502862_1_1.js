function(name) {
    if (!path.existsSync("./" + name)) {
      fs.mkdirSync("./" + name, "0777");
      return console.log("	" + name + " is generated.");
    }
  }