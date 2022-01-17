function DTA_grip() {
    dbg_assert(!this.exited,
               'grip() should not be called on exited browser actor.');
    dbg_assert(this.actorID,
               'tab should have an actorID.');
    return {
      'actor': this.actorID,
      'title': this.browser.contentTitle,
      'url': this.browser.document.documentURI
    }
  }