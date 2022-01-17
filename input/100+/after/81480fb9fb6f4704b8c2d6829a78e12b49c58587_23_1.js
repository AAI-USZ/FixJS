function () {
  // NB. Rules and buffer can be reset by the token handler
  var i = this._ruleIndex, p, matched

  this._ruleIndex = 0
  this._resetRuleIndex = false

  for (
    ; this.offset < this.length && i < this._rules.length
    ; i++
    )
  {
    p = this._rules[i]
    // Check that there is enough data to check the first rule
    if (p.length > 0 && (this.length - this.offset) < p.length) break

    // Return the size of the matched data (0 is valid!)
    matched = p.test(this.buffer, this.offset)
    if ( matched >= 0 ) {
      this.offset += matched
      // this._ruleIndex = i
      // Is the token to be processed?
      if ( !p.ignore ) {
        // Emit the data by default, unless the handler is set
        if (p.handler) p.handler(p.token, p.idx, p.type)
        else this.emit_data(p.token, p.idx, p.type)
      }
      // Load a new set of rules
      if (p.next) this.loadRuleSet(p.next, p.nextIndex)

      // Rule set may have changed...
      if (this._resetRuleIndex) {
        this._resetRuleIndex = false
        i = this._ruleIndex - 1
      // Continue?
      } else if (p.continue !== null) {
        i += p.continue
        // Keep track of the rule index we are at
        this._ruleIndex = i + 1
        // Skip the token and keep going, unless rule returned 0
      } else {
        i = -1
        this._ruleIndex = 0
      }

      if (p.break) break

      // Hold on if the stream was paused
      if (this.paused) {
        // Keep track of the rule index we are at
        this._ruleIndex = i + 1
        this.needDrain = true
        return false
      }
    // } else if (p.continueOnFail !== null) {
    } else {
      i += p.continueOnFail
      // Keep track of the rule index we are at
      this._ruleIndex = i + 1
    }
  }

  if (this.offsetBuffer < 0) {
    // Remove tokenized data from the buffer
    if (this.offset === this.length) {
      this.offset = 0
      this.buffer = this._bufferMode ? new Buffer : ''
      this.emit_empty(this.ending)

      var emptyHandler = this._emptyHandler, n = emptyHandler.length
      if (n > 0) {
        for (i = 0, n = emptyHandler.length; i < n; i++) {
          p = emptyHandler[i]

          if ( !p.ignore ) {
            if (p.handler) p.handler(this.ending)
            else this.emit_data(p.token, p.idx, p.type)
          }

          if (p.next) this.loadRuleSet(p.next, p.nextIndex)

          if (this._resetRuleIndex) this._resetRuleIndex = false
          else if (p.continue !== null) this._ruleIndex = i + 1

          if (this.paused) {
            this._ruleIndex = i + 1
            this.needDrain = true
            return false
          }
        }
      }
    } else if (this.offset > this.length) {
      // Can only occurs if offset was manually incremented
      this.offset = this.offset - this.length
      this.buffer = this._bufferMode ? new Buffer : ''
    } else {
      this.buffer = this.slice(this.offset)
      this.offset = 0
    }
  }
  
  return this._done()
}