function(name) {
    if (!fs.existsSync("./" + name)) {
      fs.mkdirSync("./" + name, "0777");
      return console.log("	" + name + " is generated.");
    }
  }