function MessageComposition(api, handle) {
  this._api = api;
  this._handle = handle;

  this.senderIdentity = null;

  this.to = null;
  this.cc = null;
  this.bcc = null;

  this.subject = null;

  this.body = null;

  this._references = null;
  this._customHeaders = null;
  // XXX attachments aren't implemented yet, of course.  They will be added
  // via helper method.
  this._attachments = null;
}