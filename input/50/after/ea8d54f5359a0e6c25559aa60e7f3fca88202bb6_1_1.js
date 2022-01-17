function (relative) {
    var web_path = resolveWebPath(relative);
    if (fs.existsSync(web_path)) {
      return web_path;
    }
    return resolveAppPath(relative);
  }