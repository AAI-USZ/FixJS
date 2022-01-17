function(obj) {
  version.dispatchOnDataFormatVersion(this, 'deserializeFromObject', obj.version,
                                   obj);

  this.keysize = _getKeySizeFromBitlength(this.p.bitLength());
  
  return this;
}