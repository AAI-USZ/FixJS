function () {
  if (!fs.existsSync(this.path + 'customize.js')) { return; }
  this.log.info('Loading overrides');
  this.overrides = require(this.path + 'customize');
}