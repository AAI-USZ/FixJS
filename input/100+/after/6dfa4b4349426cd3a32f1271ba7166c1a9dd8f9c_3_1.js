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
      // Is the token to be processed?
      if ( !p.ignore ) {
        // Emit the data by default, unless the handler is set
        if (p.handler) p.handler(p.token, p.idx, p.type)
        else this.emit_data(p.token, p.idx, p.type)
      }
      // Load a new set of rules
      if (p.next) this.loadRuleSet(p.next, p.nextIndex)

      // Rule set may have changed...from loadRuleSet() or handler()
      if (this._resetRuleIndex) {
        this._resetRuleIndex = false
        i = this._ruleIndex - 1
      // Continue?
      } else if (typeof p.continue === 'number') {
        i += p.continue
        // Keep track of the rule index we are at
        this._ruleIndex = i + 1
        // Skip the token and keep going, unless rule returned 0
      } else if (matched > 0) {
        i = -1
        // Keep track of the rule index we are at
        this._ruleIndex = 0
      }

      if (p.break) break

      // Hold on if the stream was paused
      if (this.paused) {
        this.needDrain = true
        return false
      }
    } else if (typeof p.continueOnFail === 'number') {
      i += p.continueOnFail
      // Keep track of the rule index we are at
      this._ruleIndex = i + 1
    }
  }

  // End of buffer reached
  if (this.offset === this.length) {
    var emptyHandler = this._emptyHandler, n = emptyHandler.length

    for (i = 0, n = emptyHandler.length; i < n; i++) {
      p = emptyHandler[i]

      if ( !p.ignore ) {
        if (p.handler) p.handler(this.ending)
        else this.emit_data(p.token, p.idx, p.type)
      }

      if (p.next) this.loadRuleSet(p.next, p.nextIndex)

      if (this._resetRuleIndex) this._resetRuleIndex = false
      else if (p.continue !== null) this._ruleIndex = i + 1

      // NB. subsequent empty handlers will not be called
      if (this.paused) {
        this._ruleIndex = i + 1
        this.needDrain = true
        return false
      }
    }
  }

  // Truncate the buffer if possible: min(offset, markedOffset)
  if (this.markedOffset < 0) {
    // No marked offset or beyond the current offset
    if (this.offset === this.length) {
      this.offset = 0
      this.buffer = this._bufferMode ? new Buffer : ''
      this.emit_empty(this.ending)

    } else if (this.offset < this.length) {
      this.buffer = this.slice(this.offset)
      this.offset = 0

    } else {
      // Can only occurs if offset was manually incremented
      this.offset = this.offset - this.length
      this.buffer = this._bufferMode ? new Buffer : ''
    }

  } else {
    var maxOffset = 'markedOffset'
    var minOffset = 'offset'
    var _

    if (this.markedOffset < this.offset) {
      _ = maxOffset
      maxOffset = minOffset
      minOffset = _
    }

    if (this[minOffset] === this.length) {
      this[maxOffset] -= this[minOffset]
      this[minOffset] = 0
      this.buffer = this._bufferMode ? new Buffer : ''
      this.emit_empty(this.ending)

    } else if (this[minOffset] < this.length) {
      this[maxOffset] -= this[minOffset]
      this.buffer = this.slice(this[minOffset])
      this[minOffset] = 0

    } else {
      // Can only occurs if offset was manually incremented
      this[maxOffset] -= this.length
      this[minOffset] -= this.length
      this.buffer = this._bufferMode ? new Buffer : ''
    }
  }
  this.length = this.buffer.length
  
  return this._done()
}