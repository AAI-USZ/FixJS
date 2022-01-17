function(handler_cb, jid) {
        var iq = buildIq("get", this._connection.jid, jid);
        this._connection.sendIQ(iq.tree(), handler_cb, null);
    }