function LocalActHandler(options) {
  options = options || {};
  ActHandler.call(this, options);

  this.cloud = options.cloud || "./cloud/";
  this.main = options.main || "main.js";
  this.listen = options.listen || true;
  this.env = null;
  this.legacy = false;
  this.init();

  if(this.listen) {
    this.listenTo(this.cloud);
  }
}