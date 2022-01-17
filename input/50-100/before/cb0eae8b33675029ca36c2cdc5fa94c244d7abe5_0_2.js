function(handler_cb, vCardEl, jid) {
        var iq = buildIq("set", this._connection.jid, jid, vCardEl);
        this._connection.sendIQ(iq.tree(), handler_cb, null);
    }