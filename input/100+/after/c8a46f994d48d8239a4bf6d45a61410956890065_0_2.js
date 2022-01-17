function MailBody(api, suid, wireRep) {
  this._api = api;
  this.id = suid;

  this.to = wireRep.to;
  this.cc = wireRep.cc;
  this.bcc = wireRep.bcc;
  this.replyTo = wireRep.replyTo;
  this.attachments = null;
  if (wireRep.attachments) {
    this.attachments = [];
    for (var iAtt = 0; iAtt < wireRep.attachments.length; iAtt++) {
      this.attachments.push(new MailAttachment(wireRep.attachments[iAtt]));
    }
  }
  // for the time being, we only provide text/plain contents, and we provide
  // those flattened.
  this.bodyRep = wireRep.bodyRep;
}