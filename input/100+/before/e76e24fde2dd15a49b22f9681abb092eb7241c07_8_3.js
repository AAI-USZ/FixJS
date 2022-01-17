function(conn, sessionId, pzhId, conn_csr, code) {
  try{
    var msg = {"type" : "prop", "from" : sessionId, "to": pzhId,
      "payload": {"status": "clientCert", "message": {csr: conn_csr, code: code}}};       
    var buf = new Buffer('#'+JSON.stringify(msg)+'#', 'utf8');
    conn.write(buf);
  } catch(err) {
    log("INFO","[PZP-"+ self.sessionId+"]Failed sending client certificate to the PZH" );
    conn.socket.end();
  }
}