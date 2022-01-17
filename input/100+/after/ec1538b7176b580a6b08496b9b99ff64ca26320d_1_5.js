function (flag) {
  var rules = this._rules

  if (flag) {
    this._group++
    this._groupStartPrev.push(this._groupStart)
    this._groupStart = rules.length

    return this
  }

  // Ignore invalid groupRule()
  if (this._group < 0) return this
  
  // 1 or 0 rule within the group, ignored it
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

  this._group--
  this._groupStart = this._groupStartPrev.pop() || 0
  this._groupEnd = 0

  return this
}