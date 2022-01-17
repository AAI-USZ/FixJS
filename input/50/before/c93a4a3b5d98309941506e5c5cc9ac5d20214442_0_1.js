function(buffer, chunkSize) {
  var self = this;

  var chunkArray = self.prepareMultipleChunks(buffer, chunkSize);
  var datagrams = self.prepareDatagrams(chunkArray);

  self.sendMultipleMessages(datagrams);
}