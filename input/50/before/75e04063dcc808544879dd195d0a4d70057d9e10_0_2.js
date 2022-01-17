function (newKey) {
  if (!this._profilePicKey) {
    this.setProfilePicKey();
  }
  return this._profilePicKey;
}