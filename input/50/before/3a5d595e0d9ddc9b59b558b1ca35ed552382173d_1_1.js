function() {
  if(! this._address)
    throw new Error('not binded');

  return this._address;
}