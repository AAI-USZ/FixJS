function testActorConstructor(name, _parentUniqueName) {
      this.__name = name;
      this._uniqueName = gUniqueActorName++;
      this._parentUniqueName = _parentUniqueName;
      // initially undefined, goes null when we register for pairing, goes to
      //  the logger instance when paired.
      this._logger = undefined;
      this._expectations = [];
      this._expectationsMetSoFar = true;
      this._expectNothing = false;
      this._expectDeath = false;
      this._unorderedSetMode = false;
      this._activeForTestStep = false;
      this._iEntry = this._iExpectation = 0;
      this._lifecycleListener = null;
    }