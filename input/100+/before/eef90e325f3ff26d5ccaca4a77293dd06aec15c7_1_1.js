function chewBodyParts(rep, bodyPartContents,
                                               folderId) {

  var bodyRep = $quotechew.quoteProcessTextBody(bodyPartContents.join('\n')),
      snippet = $quotechew.generateSnippet(bodyRep);

  rep.header = {
    // the UID (as an integer)
    id: rep.msg.id,
    // The sufficiently unique id is a concatenation of the UID onto the
    // folder id.
    suid: folderId + '/' + rep.msg.id,
    // The message-id header value; as GUID as get for now; on gmail we can
    // use their unique value, or if we could convince dovecot to tell us, etc.
    guid: rep.msg.msg.meta.messageId,
    // mailparser models from as an array; we do not.
    author: rep.msg.msg.from[0] || null,
    date: rep.msg.date,
    flags: rep.msg.flags,
    hasAttachments: rep.attachments.length > 0,
    subject: rep.msg.msg.subject,
    snippet: snippet,
  };


  // crappy size estimates where we assume the world is ASCII and so a UTF-8
  // encoding will take exactly 1 byte per character.
  var sizeEst = OBJ_OVERHEAD_EST + NUM_ATTR_OVERHEAD_EST +
                  4 * NULL_ATTR_OVERHEAD_EST;
  function sizifyAddrs(addrs) {
    sizeEst += LIST_ATTR_OVERHEAD_EST;
    for (var i = 0; i < addrs.length; i++) {
      var addrPair = addrs[i];
      sizeEst += OBJ_OVERHEAD_EST + 2 * STR_ATTR_OVERHEAD_EST +
                   addrPair.name.length + addrPair.address.length;
    }
    return addrs;
  }
  function sizifyAttachments(atts) {
    sizeEst += LIST_ATTR_OVERHEAD_EST;
    for (var i = 0; i < atts.length; i++) {
      var att = atts[i];
      sizeEst += OBJ_OVERHEAD_EST + 2 * STR_ATTR_OVERHEAD_EST +
                   att.name.length + att.type.length +
                   NUM_ATTR_OVERHEAD_EST;
    }
    return atts;
  }
  function sizifyStr(str) {
    sizeEst += STR_ATTR_OVERHEAD_EST + str.length;
    return str;
  }
  function sizifyBodyRep(rep) {
    sizeEst += LIST_OVERHEAD_EST +
                 NUM_OVERHEAD_EST * (rep.length / 2) +
                 STR_OVERHEAD_EST * (rep.length / 2);
    for (var i = 1; i < rep.length; i += 2) {
      if (rep[i])
        sizeEst += rep[i].length;
    }
    return rep;
  };

  rep.bodyInfo = {
    date: rep.msg.date,
    size: sizeEst,
    to: ('to' in rep.msg.msg) ? sizifyAddrs(rep.msg.msg.to) : null,
    cc: ('cc' in rep.msg.msg) ? sizifyAddrs(rep.msg.msg.cc) : null,
    bcc: ('bcc' in rep.msg.msg) ? sizifyAddrs(rep.msg.msg.bcc) : null,
    replyTo: ('reply-to' in rep.msg.msg.parsedHeaders) ?
               sizifyStr(rep.msg.msg.parsedHeaders['reply-to']) : null,
    attachments: sizifyAttachments(rep.attachments),
    references: rep.msg.msg.meta.references,
    bodyRep: sizifyStr(bodyRep),
  };

  return true;
}