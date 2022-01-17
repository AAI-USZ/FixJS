function() {
    return {
      senderId: this.senderIdentity.id,
      to: this.to,
      cc: this.cc,
      bcc: this.bcc,
      subject: this.subject,
      body: this.body,
      referencesStr: this._references,
      customHeaders: this._customHeaders,
      attachments: this._attachments,
    };
  }