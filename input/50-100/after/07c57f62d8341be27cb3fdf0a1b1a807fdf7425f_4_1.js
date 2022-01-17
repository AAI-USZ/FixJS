function(doc){
      var connection = new IRCLink(doc.hostname, doc.port, doc.ssl, doc.selfSigned, doc.nick, doc.nick, doc.password, doc.rejoin, doc.channels);
      connection.associateUser(doc.user);
      connections[doc.user] = connection;
    }