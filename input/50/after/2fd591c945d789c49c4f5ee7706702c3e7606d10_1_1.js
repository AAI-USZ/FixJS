function (environment) {
  return this.__processedAsset__.isFresh(environment) && this.isCompiled;
}