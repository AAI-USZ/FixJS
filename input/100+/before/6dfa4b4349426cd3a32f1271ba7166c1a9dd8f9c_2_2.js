function check (prop) {
    // Process the property
    if (rule[prop] !== null && typeof rule[prop] !== 'number') {
      j = this._getRuleIndex(rule.id)
      if (j < 0)
        this._error( new Error('Atok#_resolveRules: continue() value not found: ' + rule.id) )
      
      rule[prop] = i - j
    }
    // Check the continue boundaries
    if (rule[prop] !== null) {
      j = i + rule[prop] + 1
      if (j < 0 || j > rules.length - 1)
        this._error( new Error('Atok#_resolveRules: continue() value out of bounds: ' + rule[prop] + ' index ' + i) )
    }
  }