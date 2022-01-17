function Atok (options) {
  if (!(this instanceof Atok))
    return new Atok(options)

  // Possible events are defined at instanciation for better performance
  EV.call(this, Atok.events)
  this.writable = true
  this.readable = true

  // Options
  options = options || {}
  this._bufferMode = (options.bufferMode === true)
  this._encoding = options.encoding
  // Apply the default encoding value
  this.setEncoding(options.encoding)

  // Initializations
  // Debug flag
  this.debugMode = false

  // Status flags
  this.ended = false        // Flag indicating stream has ended
  this.ending = false       // Set when end() invokes write()
  this.paused = false       // Flag indicating stream is paused
  this.needDrain = false    // Flag indicating stream needs drain

// include("Atok_properties.js")
  // Public properties
  this.buffer = this._bufferMode ? new Buffer : ''
  this.offset = 0
  this.offsetBuffer = -1    // Flag indicating whether the buffer should be kept when write() ends

  // Private properties
  this._ruleIndex = 0
  this._resetRuleIndex = false
  this._stringDecoder = new StringDecoder(this._encoding)
  this._rulesToResolve = false
  this._groupStart = 0
  this._groupEnd = 0


    this.currentRule = null   // Name of the current rule  
    this._emptyHandler = []    // Handler to trigger when the buffer becomes empty
    this._rules = []           // Rules to be checked against
    this._defaultHandler = null       // Matched token default handler
    this._savedRules = {}           // Saved rules

// include("Atok_rule_properties.js")
  this._p_ignore = false        // Get the token size and skip
  this._p_quiet = false         // Get the token size and call the handler with no data
  this._p_escape = false        // Pattern must not be escaped
  this._p_trimLeft = true       // Remove the left pattern from the token
  this._p_trimRight = true      // Remove the right pattern from the token
  this._p_next = null           // Next rule to load
  this._p_nextIndex = 0         // Index for the next rule to load
  this._p_continue = null       // Next rule index to load
  this._p_continueOnFail = null // Next rule index to load when rule fails
  this._p_break = false         // Abort current rule set

  this._defaultProps = Object.keys(this)
    .filter(function (prop) {
      return prop.substr(0, 3) === '_p_'
        && !/_p_(continueOnFail|nextIndex)/.test(prop)
    })
    .map(function (prop) {
      return prop.substr(3)
    })
}