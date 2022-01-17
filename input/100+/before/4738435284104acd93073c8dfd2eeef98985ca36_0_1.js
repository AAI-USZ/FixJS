function(start, end, success, error) {
        var conn = this._connection;
        var queryAttrs = { xmlns: Strophe.NS.MAM };
        if (start)
            queryAttrs.start = start.toISOString();
        if (end)
            queryAttrs.end = end.toISOString();
        var iq = $iq({ from: conn.jid,
                       to: this.channels.jid,
                       type: 'get' }).
            c('query', queryAttrs);
        conn.sendIQ(iq, success, this._errorcode(error));
    }