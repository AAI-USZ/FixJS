function(roomJid, historyStanzas) {
    if (!historyStanzas) {
      historyStanzas = 0;
    }
    var packet = new xmpp.Element('presence', { to: roomJid + '/' + this.name });
    packet.c('x', { xmlns: 'http://jabber.org/protocol/muc' })
          .c('history', {
            xmlns: 'http://jabber.org/protocol/muc',
            maxstanzas: String(historyStanzas)
          });
    this.jabber.send(packet);
  }