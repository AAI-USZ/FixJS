function() {
    this.view
        .assign('attr', this.req.post("username", "string"))
        .assign('value', this.req.post("hobby", "array").join(","))
        .assign('id', this.req.get('id', 'int'));

    var files = this.req.file("files");

    if (files) {
        fs.rename(files.path, $_APP.config.uploadDir + '/' + files.filename);
    }


    this.res.renderView('index', this.view);
}