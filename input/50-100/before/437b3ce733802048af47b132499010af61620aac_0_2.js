function() {
    if (this.__stepCleanup)
      this.__stepCleanup();

    var expectationsWereMet = this._expectationsMetSoFar;
    this._expectationsMetSoFar = true;
    // kill all processed entries.
    this._iExpectation = 0;
    this._expectations.splice(0, this._expectations.length);
    this._expectDeath = false;
    this._unorderedSetMode = false;
    this._deferred = null;
    this._resolved = false;
    this._activeForTestStep = false;
    return expectationsWereMet;
  }