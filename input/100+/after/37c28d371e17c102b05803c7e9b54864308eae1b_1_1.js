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
        // Or at the same level but different
        if (_rule.group > rule.group
        || (_rule.group === rule.group && _rule.groupStart !== rule.groupStart)
        ) {
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