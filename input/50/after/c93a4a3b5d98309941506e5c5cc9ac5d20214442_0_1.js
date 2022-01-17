function(buffer, chunkSize) {
  var self = this,
      chunkArray,
      datagrams;

  chunkArray = self.prepareMultipleChunks(buffer, chunkSize);
  datagrams = self.prepareDatagrams(chunkArray);

  self.sendMultipleMessages(datagrams);
}