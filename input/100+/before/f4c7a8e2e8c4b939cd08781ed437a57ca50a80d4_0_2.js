function fetchHeader(chunk) {
    _$jscoverage['nssocket.js'][229]++;
    if (bufferJoiner.length + chunk.length >= 9) {
      _$jscoverage['nssocket.js'][230]++;
      var header = bufferJoiner.add(chunk).join();
      _$jscoverage['nssocket.js'][231]++;
      eventLength = header.readUInt32BE(0);
      _$jscoverage['nssocket.js'][232]++;
      messageLength = header.readUInt32BE(4);
      _$jscoverage['nssocket.js'][233]++;
      messagetype = header.readInt8(8);
      _$jscoverage['nssocket.js'][234]++;
      fetchBody(chunk.slice(9));
    }
    else {
      _$jscoverage['nssocket.js'][236]++;
      bufferJoiner.add(chunk);
    }
}