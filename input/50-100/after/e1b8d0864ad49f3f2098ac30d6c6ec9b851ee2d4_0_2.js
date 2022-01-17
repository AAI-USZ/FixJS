function(pageDef) {
    var lpath = __dirname + '/' + markdown_destination + '/' + pageDef.config.dir;
    if (!fs.existsSync(lpath)) {
        wrench.mkdirSyncRecursive(lpath);
    }
    //var filename = pageDef.config.name ? pageDef.config.name : pageDef.title.toLowerCase();
    var filename = pageDef.title.toLowerCase().replace(/-/g, "").replace(/__/g, "_");
    return lpath + '/' + filename + '.md';
}