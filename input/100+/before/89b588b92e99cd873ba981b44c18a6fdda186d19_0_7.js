function (data, offset) {
  var matched = 0       // SubRule result: Integer: matched size, Other: token
  var matchedTotal = 0  // Total jump
  var matchedForToken = 0  // Offset when a token was set
  var start = offset    // Buffer start
  var s = data
  var token = false

  var rule = this.rules
  var n = rule.length
  var firstRule = rule[0]
  var lastRule = rule[n-1]
  var trimLeftSize = 0

  // Check rules:
  // all must be valid for the token to be extracted
  // token is either given by one of the rule or it is set by slice(0, matched)
  // where matched is the index of the last match 
  for (var i = 0; i < n; i++) {
    // Reminder: size is dynamic!
    matched = rule[i].exec(s, start + matched, matched - trimLeftSize)

    this.atok.emit_debug(
        'Rule#test'
    ,   'subrule-START'
    , [ 
        this.handler !== null ? (this.handler.name || '#emit()') : this.type
      , i + 1
      , n
      , start
      , matched
      ]
    )


    if ( matched < 0 ) { // Invalid rule

  this.atok.emit_debug('Rule#test', 'subrule-END', [ offset, -1 ])

      return -1
    } else { // Valid rule

      matchedTotal += matched
      matched = matchedTotal
    }

  }
  this.idx = lastRule.idx
  // 1 rule || no token extraction || ignore token -> nothing else to do



      var tokenLength = matchedTotal - trimLeftSize - lastRule.size

      this.token = this.noToken
        // Set the token to the size of what would have been extracted
        ? tokenLength
        // By default, the token is stripped out from the left and last right patterns
        : this.emptyToken ? '' : data.substr( offset + trimLeftSize, tokenLength )



  this.atok.emit_debug('Rule#test', 'subrule-END', [ offset, matchedTotal ])

  return matchedTotal
}