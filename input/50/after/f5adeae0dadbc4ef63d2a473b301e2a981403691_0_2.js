function (sessionID, callback) {
  console.log("client.getCurrentVideo");
  var video = new Video(sessionID.vidya);
  // goes to the server, performs callback
  return callback(null, video)
}