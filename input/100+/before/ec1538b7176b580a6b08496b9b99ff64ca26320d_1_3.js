function check (prop) {
    if (rule[prop] === null) return

    // Resolve the property to an index
    if (typeof rule[prop] !== 'number') {
      j = this._getRuleIndex(rule.id)
      if (j < 0)
        this._error( new Error('Atok#_resolveRules: continue() value not found: ' + rule.id) )
      
      rule[prop] = i - j
    }

    // Check the continue boundaries
    j = i + rule[prop] + 1
    // Cannot jump to a rule before the first one
    // or beyond the last one.
    // NB. jumping to a rule right after the last one is accepted since
    // it will simply stop the parsing
    if (j < 0 || j > rules.length)
      this._error( new Error('Atok#_resolveRules: continue() value out of bounds: ' + rule[prop] + ' index ' + i) )
  }