function (name) {
  // Check and set the continue values
  var rules = name ? this._savedRules[name].rules : this._rules
  var rule, j

  for (var i = 0, n = rules.length; i < n; i++) {
    rule = rules[i]
    if (rule.continue !== null && typeof rule.continue !== 'number') {
      j = this._getRuleIndex(rule.id)
      if (j < 0)
        this._error( new Error('Atok#_resolveRules: continue() value not found: ' + rule.id) )
      
      rule.continue = i - j
    }
    // Check the continue boundaries
    if (rule.continue !== null) {
      j = i + rule.continue + 1
      if (j < 0 || j > rules.length - 1)
        this._error( new Error('Atok#_resolveRules: continue() value out of bounds: ' + rule.continue + ' index ' + i) )
    }
  }

  this._rulesToResolve = false

  // Adjust continue jumps according to groups
  for (i = 0; i < n; i++) {
    rule = rules[i]
    // Check each rule continue property
    if (rule.continue !== null) {
      if (rule.continue > 0) {
        // Positive jump
        for (var j = 1, m = rule.continue + 1; j < m; j++) {
          // Scan all rules from the current one to the target one
          rule.continue += rules[i + j].groupEnd > 0
            ? rules[i + j].groupEnd - rules[i + j].groupStart
            : 0
        }
      } else if (rule.continue < -1) {
        // Negative jump
        for (var j = 1, m = -rule.continue; j < m; j++) {
          // Scan all rules from the current one to the target one
          rule.continue -= rules[i - j].groupEnd > 0
            ? rules[i - j].groupEnd - rules[i - j].groupStart
            : 0
        }
      }
    }
  }
}