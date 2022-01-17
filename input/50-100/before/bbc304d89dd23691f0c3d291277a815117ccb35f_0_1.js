function(){
    var map = this.get("identityMap");
    if (map === undefined) {
      this.set("identityMap", EmberMapper.NullIdentityMap.create());
    } else if (!map) {
      this.set("identityMap", EmberMapper.IdentityMap.create());
    }
  }