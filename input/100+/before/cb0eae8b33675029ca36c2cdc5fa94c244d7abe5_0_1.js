function(type, from, jid, vCardEl) {
    var iq;
    if (!jid)
    {
        //retrieve current jid's vCard
        iq = $iq({type:type, from:from});
    }
    else
    {
        iq = $iq({type:type, to:jid, from:from});
    }
    var ret = iq.c("vCard", {xmlns:Strophe.NS.VCARD});
    if (vCardEl)
    {
        ret = ret.cnode(vCardEl);
    }
    return ret;
}