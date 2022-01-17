function(path) {
    if (path.substring(0, 3) === "../") return true;
    if (path.substring(0, 1) === "/") return true;

    path = path.split("/");

    var cwd = fs.readdirSync(process.cwd());

    return !!(cwd.indexOf(path[0]) === -1);
  }