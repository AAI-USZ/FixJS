function() {
  // return {protocol: "https://", domain:"localhost", port:"6984"}; //https
  return {
    protocol : "http://",
    domain : "ifield.fieldlinguist.com",
    port : "5984",
    corpusname : "test"
  }; // http because pouch doesnt support https
}