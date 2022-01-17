function(jid, success, error, timeout) {
        var that = this._connection;
        var iq = buildIq("get", this._connection.jid, jid);
        return that.sendIQ(iq.tree(), success, error, timeout);
    }