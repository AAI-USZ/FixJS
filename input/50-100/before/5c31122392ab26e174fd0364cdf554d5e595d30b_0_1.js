function LocalActHandler(options) {
  options = options || {};
  ActHandler.call(this, options);

  this.cloud = options.cloud || "./cloud/";
  this.main = options.main || "main.js";
  this.watch = options.watch !== undefined ? options.watch : true;
  this.env = null;
  this.legacy = false;
  this.init();

  if(this.watch) {
    this.listenTo(this.cloud);
  }
}