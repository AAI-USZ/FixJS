function(xml) {
    var error = xml.ele('error')
                       .ele('class').dat(this.error.type).up()
                       .ele('message').dat(this.error.message).up()
                       .ele('backtrace');

    this.error.stack.forEach(function(line) {
        if (!line.file) {
            line.file = 'unknown';
        }

        if (this.request.projectRoot) {
            line.file = line.file.replace(this.request.projectRoot, '[PROJECT_ROOT]');
        }

        error.ele('line')
                 .att('method', line.function)
                 .att('file',   line.file)
                 .att('number', line.line || 'unknown')
    }.bind(this));
}