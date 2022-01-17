function (newKey) {
  if (!Account._profilePicKey) {
    this.setProfilePicKey();
  }
  return Account._profilePicKey;
}