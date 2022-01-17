function plugin (racer) {
  var BUNDLE_TIMEOUT = racer.get('bundle timeout') ||
    racer.set('bundle timeout', 1000);
  mixin.static = { BUNDLE_TIMEOUT: BUNDLE_TIMEOUT };
  racer.mixin(mixin);
}