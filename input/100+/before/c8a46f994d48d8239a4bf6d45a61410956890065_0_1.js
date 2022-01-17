function MailHeader(slice, wireRep) {
  this._slice = slice;
  this.id = wireRep.suid;

  this.author = wireRep.author;

  this.date = new Date(wireRep.date);
  this.__update(wireRep);
  this.hasAttachments = wireRep.hasAttachments;

  this.subject = wireRep.subject;
  this.snippet = wireRep.snippet;

  this.onchange = null;
  this.onremove = null;

  // build a place for the DOM element and arbitrary data into our shape
  this.element = null;
  this.data = null;
}