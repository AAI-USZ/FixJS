function (id) {
  for (var rules = this._rules, i = 0, n = rules.length; i < n; i++)
    if (rules[i].id === id) break
  
  return i === n ? -1 : i
}