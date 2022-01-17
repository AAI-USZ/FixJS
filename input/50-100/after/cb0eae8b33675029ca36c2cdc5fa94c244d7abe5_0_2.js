function(jid, vCardEl, success, error, timeout) {
        var that = this._connection;
        var iq = buildIq("set", this._connection.jid, jid, vCardEl);
        that.sendIQ(iq.tree(), success, error, timeout);
    }