function RequestHandler(options) {
  options = options || {};
  this.subDomain = options.domain || "apps";
  this.baseDomain = options.baseDomain || "feedhenry.com";
  this.target = this.subDomain + "." + options.baseDomain;
  this.guid = options.app || options.guid || "";
}