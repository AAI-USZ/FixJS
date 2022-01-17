function resolveId (prop) {
    if (rule[prop] === null) return

    // Resolve the property to an index
    if (typeof rule[prop] !== 'number') {
      var j = self._getRuleIndex(rule.id)
      if (j < 0)
        self._error( new Error('Atok#_resolveRules: continue() value not found: ' + rule.id) )
      
      rule[prop] = i - j
    }
  }