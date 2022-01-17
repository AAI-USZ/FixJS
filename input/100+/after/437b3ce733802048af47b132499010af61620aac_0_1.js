function() {
    // we can't do anything if we don't have an actor.
    var entries = this._logger._entries, expy, entry;
    // -- unordered mode
    if (this._unorderedSetMode) {

      while (this._iExpectation < this._expectations.length &&
             this._iEntry < entries.length) {
        entry = entries[this._iEntry++];
        // ignore meta-entries (which are prefixed with a '!')
        if (entry[0][0] === "!")
          continue;

        // - try all the expectations for a match
        var foundMatch = false;
        for (var iExp = this._iExpectation; iExp < this._expectations.length;
             iExp++) {
          expy = this._expectations[iExp];

          // - on matches, reorder the expectation and bump our pointer
          if (expy[0] === entry[0] &&
              this['_verify_' + expy[0]](expy, entry)) {
            if (iExp !== this._iExpectation) {
              this._expectations[iExp] = this._expectations[this._iExpectation];
              this._expectations[this._iExpectation] = expy;
            }
            this._iExpectation++;
            foundMatch = true;
            break;
          }
        }
        if (!foundMatch) {
          this._logger.__unexpectedEntry(this._iEntry - 1, entry);
          this._expectationsMetSoFar = false;
          if (this._deferred)
            this._deferred.reject([this.__defName, expy, entry]);
        }
      }

      // - generate an unexpected failure if we ran out of expectations
      if ((this._iExpectation === this._expectations.length) &&
          (entries.length > this._iEntry)) {
        // note: as below, there is no point trying to generate a rejection
        //  at this stage.
        this._expectationsMetSoFar = false;
        // no need to -1 because we haven't incremented past the entry.
        this._logger.__unexpectedEntry(this._iEntry, entries[this._iEntry]);
        // do increment past...
        this._iEntry++;
      }
      // - generate success if we have used up our expectations
      else if ((this._iExpectation >= this._expectations.length) &&
               this._deferred &&
               (this._expectDeath ? (this._logger && this._logger._died)
                                  : true)) {
        this._resolved = true;
        this._deferred.resolve();
      }
      return;
    }

    // -- ordered mode
    while (this._iExpectation < this._expectations.length &&
           this._iEntry < entries.length) {
      expy = this._expectations[this._iExpectation];
      entry = entries[this._iEntry++];

      // ignore meta-entries (which are prefixed with a '!')
      if (entry[0][0] === "!")
        continue;

      // Currently, require exact pairwise matching between entries and
      //  expectations.
      if (expy[0] !== entry[0]) {
        this._logger.__unexpectedEntry(this._iEntry - 1, entry);
        // (fallout, triggers error)
      }
      else if (!this['_verify_' + expy[0]](expy, entry)) {
        this._logger.__mismatchEntry(this._iEntry - 1, expy, entry);
        // things did line up correctly though, so boost the expecation number
        //  so we don't convert subsequent expectations into unexpected ones.
        this._iExpectation++;
        // (fallout, triggers error)
      }
      else {
        this._iExpectation++;
        continue;
      }
      // (only bad cases fall out without hitting a continue)
      if (this._expectationsMetSoFar) {
        this._expectationsMetSoFar = false;
        if (this._deferred)
          this._deferred.reject([this.__defName, expy, entry]);
      }
      return;
    }
    // - unexpected log events should count as failure
    // We only care if: 1) we were marked active, 2) we had at least one
    //  expectation this step OR we were explicitly marked to have no
    //  expectations this step.
    // Because we will already have resolved() our promise if we get here,
    //  it's up to the test driver to come back and check us for this weird
    //  failure, possibly after waiting a tick to see if any additional events
    //  come in.
    if (this._activeForTestStep &&
        ((this._expectations.length &&
          (this._iExpectation === this._expectations.length) &&
          (entries.length > this._iEntry)) ||
         (!this._expectations.length &&
          this._expectNothing))) {
      this._expectationsMetSoFar = false;
      this._logger.__unexpectedEntry(this._iEntry, entries[this._iEntry]);
      // We intentionally increment iEntry because otherwise we'll keep marking
      // the same entry as unexpected when that is in fact not what we desire.
      // In previous parts of this function it made sense not to increment, but
      // here it just causes confusion.
      this._iEntry++;
    }

    if ((this._iExpectation >= this._expectations.length) && this._deferred &&
        (this._expectDeath ? (this._logger && this._logger._died) : true)) {
      this._resolved = true;
      this._deferred.resolve();
    }
  }