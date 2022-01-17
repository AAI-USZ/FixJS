function Rule (subrules, type, handler, options) {
  if ( !(this instanceof Rule) )
    return new Rule(subrules, type, handler, options)
  
  var self = this
  options = options || {}

  // Rule options
  this.trimLeft = options._p_trimLeft
  this.trimRight = options._p_trimRight
  this.ignore = options._p_ignore
  this.quiet = options._p_quiet
  this.escape = options._p_escape
  this.next = (typeof options._p_next === 'string') ? options._p_next : null
  this.nextIndex = options._p_nextIndex
  this.continue = options._p_continue
  this.continueOnFail = options._p_continueOnFail
  this.break = options._p_break

  this.bufferMode = (options._bufferMode === true)
  this.groupStart = options._groupStart
  this.groupEnd = options._groupEnd

  this.atok = options

  this.type = type
  this.handler = handler
  this.prevHandler = null
  this.id = this.type !== null ? this.type : handler

  this.rules = []
  this.idx = -1     // Subrule pattern index that matched (-1 if only 1 pattern)
  this.length = 0   // First subrule pattern length (max of all patterns if many)
  // Does the rule generate any token?
  this.noToken = this.quiet || this.ignore
  // Generated token
  this.token = this.noToken ? 0 : ''
  // In some cases, we know the token will be empty, no matter what
  // NB. this.noToken is tested before emptyToken
  this.emptyToken = false

  // Special case: addRule(0)
  if (subrules === 0) return this

  // Special case: addRule()
  if (subrules.length === 0) {
    this.test = this.nothing
    return this
  }

  // Instantiate all sub rules
  for (var r, i = 0, n = subrules.length; i < n; i++) {
    r = SubRuleString(subrules[i], i, n, this)
    this.rules.push(r)
    this.length = Math.max(this.length, r.length)
  }
  
  // Do we have an empty token?
  this.emptyToken = (n === 1 && this.trimLeft && !this.rules[0].token)
  
  // Disable trimRight if only 1 rule
  if (this.rules.length === 1)
    this.trimRight = false

  // Filter out non rules
  this.rules = this.rules.filter(function (r, i) {
    var flag = typeof r.exec === 'function'
    // Disable left trimming if the first rule does not exist
    if (i === 0 && !flag) self.trimLeft = false
    return flag
  })
  // No rule left...will return all data
  if (this.rules.length === 0) {
    this.test = this.noToken ? this.allNoToken : this.all
  } else {
    // Does the rule generate any token regardless of its properties?
    for (var i = 0, n = this.rules.length; i < n; i++)
      if (this.rules[i].token) break

    this.genToken = (i < n)
    this.setDebug(true)
  }
}