function Configger(config) {
    this.root   = config.root;
    this.tmpl   = config.tmpl;
    this.filter = new RegExp(config.filter);
    this.output = config.output;
    this.key    = config.key;
    this.extRegex = /\.js$/;
}