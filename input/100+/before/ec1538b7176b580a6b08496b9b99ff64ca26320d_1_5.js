function (flag) {
  var rules = this._rules

  if (flag !== true) {
    // Ignore invalid groupRule()
    if (this._group < 0) return this
    
    // 1 or 0 rule, group is ignored
    if (rules.length - this._groupStart < 2) {
      for (var i = this._groupStart, n = rules.length; i < n; i++) {
        rules[i].group = -1
        rules[i].groupStart = 0
        rules[i].groupEnd = 0
      }
    } else {
      // Set the last index of the group to all rules belonging to the current group
      for (var i = this._groupStart, n = rules.length; i < n; i++)
        if (rules[i].group === this._group)
          rules[i].groupEnd = n - 1
    }

    // Reset the groupStart
    if (this._groupStart > 0) {
      var prevRule = rules[ this._groupStart - 1 ]
      if (prevRule.group >= 0)
        this._groupStart = prevRule.groupStart
    }
    this._groupEnd = 0

    this._group--

    return this
  }

  this._group++
  this._groupStart = this._rules.length

  return this
}