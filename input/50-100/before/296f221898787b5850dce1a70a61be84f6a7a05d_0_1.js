function(options) {
    options = options || {};
    this.directory = options.directory || '.';

    this.functions = {
        'print': console.log.bind(console)
    };
}