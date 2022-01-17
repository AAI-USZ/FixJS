function(requestOptions, callback, data){
  var request = this.createRequest(requestOptions, data, callback);
  if(request instanceof Error) return callback(request);
  var stringData = JSON.stringify(data);
    
  if (this.logLevel === 'verbose' && stringData != "{}")
  {
    this.log(colors.brown + "REQ DATA\t\t " + colors.reset + stringData);
  }

  request.write(stringData);
  request.end();
}