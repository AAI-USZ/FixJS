function (opts) {
    var options = opts || {};
    this.width_ = options.width || '300px';
    this.createInfoBox_(options);
    this.setMap(options.map);
    this.customize_();
}