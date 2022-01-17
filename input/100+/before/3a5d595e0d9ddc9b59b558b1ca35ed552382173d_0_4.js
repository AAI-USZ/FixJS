function(string, offset, length) {
  var buffer2, offsetLength = offset + length,
    buffer = this;

  string2ArrayBuffer(string, function(buffer2) {
    for(var i=0, l=buffer2.length; i<l; ++i) {
      buffer.writeUInt8(buffer2[i], offset+i)
    }
  });

  return; 
  for (var i=offset, l=string.length; i<l && i <offsetLength; ++i) {
    buffer.writeUtf8(string.charCodeAt(i), i);
  }
}