function (newKey) {
  //If no new key is passed in, generate a random one
  this._profilePicKey = newKey || Math.random();
}