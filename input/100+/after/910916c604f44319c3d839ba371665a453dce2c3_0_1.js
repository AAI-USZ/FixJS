function() {
    this.view
        .assign('attr', this.req.post("username", "string"))
        .assign('value', this.req.post("hobby", "array").join(","))
        .assign('id', this.req.get('id', 'int'));

    var files = this.req.file("files");
    var config = require(global.APP_PATH + "/config");
    if (files) {
        fs.rename(files.path, config.uploadDir + '/' + files.filename);
    }


    this.res.renderView('index', this.view);
}