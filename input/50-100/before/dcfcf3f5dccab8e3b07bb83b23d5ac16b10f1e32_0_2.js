function RequestHandler(options) {
  options = options || {};
  this.subDomain = options.domain || "apps";
  this.baseDomain = options.baseDomain || "feedhenry.com";
  this.domain = this.subDomain + "." + options.baseDomain;
  this.guid = options.app || options.guid || "";
}