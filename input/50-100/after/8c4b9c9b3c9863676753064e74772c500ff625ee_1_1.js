function Configger(config) {
    this.options = config;

    this.options.filter = new RegExp(config.filter);
    this.options.extRegex = /\.js$/;
    this.options.comments = (config.comments !== "false");
}