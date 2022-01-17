function(doc){
      var connection = new IRCLink(doc.hostname, doc.port, doc.ssl, doc.selfSigned, doc.nick, doc.realName, doc.password, doc.rejoin, doc.away, doc.channels);
      connection.associateUser(doc.user);
      connections[doc.user] = connection;
      // set ourselves as away
      connection.client.send('AWAY', doc.away);
    }