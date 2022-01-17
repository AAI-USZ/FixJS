function(chunk) {
    params += chunk.toString();
    proxyReq.write(chunk);
  }