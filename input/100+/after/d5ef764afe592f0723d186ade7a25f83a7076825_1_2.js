function (name) {
  var self = this
  // Check and set the continue values
  var rules = name ? this._savedRules[name].rules : this._rules

  // Perform various checks on a continue type property
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

  // prop: continue type property
  function checkContinue (prop) {
    // incr: 1 or -1 (positive/negative continue)
    // offset: 0 or 1 (positive/negative continue)
    function setContinue (incr, offset) {
      // j = current index to be checked
      // count = number of indexes to check
      for (
        var j = i + incr, count = 0, m = Math.abs(rule[prop] + offset)
      ; count < m
      ; j += incr, count++
      ) {
        // Scan all rules from the current one to the target one
        var _rule = rules[j]
        // Only process rules bound to a group below the current one
        if (_rule.group > rule.group) {
          // Get to the right group
          while (_rule.group > rule.group + 1) {
            j = incr > 0 ? _rule.groupEnd + 1 : _rule.groupStart - 1
            // Jump to the end of the rules is ignored
            if (j > n) {
              rule[prop] = null
              return
            }

            _rule = rules[j]
          }
          j = incr > 0 ? _rule.groupEnd : _rule.groupStart
          rule[prop] += incr * (_rule.groupEnd - _rule.groupStart)
        }
      }
    }

    if (typeof rule[prop] === 'number') {
      // continue(0) and continue(-1) do not need any update
      if (rule[prop] > 0)
        // Positive jump
        setContinue(1, 0)
      else if (rule.continue < -1)
        // Negative jump
        setContinue(-1, 1)

      // Check the continue boundaries
      var j = i + rule[prop] + 1
      // Cannot jump to a rule before the first one or beyond the last one.
      // NB. jumping to a rule right after the last one is accepted since
      // it will simply stop the parsing
      if (j < 0 || j > n)
        self._error( new Error('Atok#_resolveRules: continue() value out of bounds: ' + rule[prop] + ' index ' + i) )
    }
  }

  // Process all rules
  // Adjust continue jumps according to groups
  for (var i = 0, n = rules.length; i < n; i++) {
    var rule = rules[i]
    // Check each rule continue property
    checkContinue('continue')
    checkContinue('continueOnFail')

    // Check the continue property
    resolveId('continue')

    // Check the continueOnFail property
    resolveId('continueOnFail')

    // Check the group is terminated
    if (rule.group >= 0 && rule.groupEnd === 0)
      this._error( new Error('Atok#_resolveRules: non terminated group starting at index ' + rule.groupStart ) )
  }

  // Resolution successfully completed
  this._rulesToResolve = false
}