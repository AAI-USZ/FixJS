function(type, from, jid, vCardEl) {
    var iq, _jid,
        _from = Strophe.getBareJidFromJid(from);
        
    if (!jid)
    {
        //retrieve current jid's vCard
        iq = $iq({type:type, from:_from});
    }
    else
    {
        _jid = Strophe.getBareJidFromJid(jid);
        iq = $iq({type:type, to:_jid, from:_from});
    }
    // var ret = iq.c("vCard", {xmlns:Strophe.NS.VCARD});
    if (vCardEl)
    {
        iq = iq.cnode(vCardEl);
    }
    else
    {
        iq.c("vCard", {xmlns:Strophe.NS.VCARD});
    }
    return iq;
}