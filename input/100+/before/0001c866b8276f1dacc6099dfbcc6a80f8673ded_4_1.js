function layer(outfn, infn) {
    var vv = this.unwrap();
    vv.translateFrom.validators.unshift(outfn);
    vv.translateTo.validators.push(infn);
    return this;
  }