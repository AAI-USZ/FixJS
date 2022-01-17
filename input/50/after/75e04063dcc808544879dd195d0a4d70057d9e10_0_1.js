function (newKey) {
  //If no new key is passed in, generate a random one
  Account._profilePicKey = newKey || Math.random();
}