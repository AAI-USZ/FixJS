function (name) {
  // Check and set the continue values
  var rules = name ? this._savedRules[name].rules : this._rules
  var rule, j

  // Perform various checks on a continue type property
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

  // Process all rules
  for (var i = 0, n = rules.length; i < n; i++) {
    rule = rules[i]
    // Check the continue property
    check.call(this, 'continue')
    // Check the continueOnFail property
    check.call(this, 'continueOnFail')
    // Check the group is terminated
    if (rule.group >= 0 && rule.groupEnd === 0)
      this._error( new Error('Atok#_resolveRules: non terminated group starting at index ' + rule.groupStart ) )
  }

  this._rulesToResolve = false

  // Adjust continue jumps according to groups
  for (i = 0; i < n; i++) {
    rule = rules[i]
    // Check each rule continue property
    if (rule.continue !== null) {
      if (rule.continue > 0) {
        // Positive jump
        // j = index to scan
        // count = number of indexes to scan
        for (var j = i + 1, count = 0, m = rule.continue; count < m; j++, count++) {
          // Scan all rules from the current one to the target one
          var _rule = rules[j]
          // Only process rules bound to a group
          if (_rule.group >= 0) {
            // Get to the right group
            while (_rule.group > rule.group + 1) {
              j += _rule.groupEnd - _rule.groupStart + 1
              _rule = rules[j]
            }
            rule.continue += _rule.groupEnd - _rule.groupStart
          }
        }
      } else if (rule.continue < -1) {
        // Negative jump
        for (var j = i - 1, count = 0, m = -(rule.continue + 1); count < m; j--, count++) {
          // Scan all rules from the current one to the target one
          var _rule = rules[j]
          // Only process rules bound to a group
          if (_rule.group >= 0) {
            // Get to the right group
            while (_rule.group > rule.group + 1) {
              j -= _rule.groupEnd - _rule.groupStart + 1
              _rule = rules[j]
            }
            rule.continue -= _rule.groupEnd - _rule.groupStart
          }
        }
      }
    }
  }
}