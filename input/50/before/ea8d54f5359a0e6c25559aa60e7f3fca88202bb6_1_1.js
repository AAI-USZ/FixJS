function (relative) {
    var web_path = resolveWebPath(relative);
    if (path.existsSync(web_path)) {
      return web_path;
    }
    return resolveAppPath(relative);
  }