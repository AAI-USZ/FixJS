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

//var keepRules = false
//include("Atok_properties.js")

//include("Atok_rule_properties.js")


  this._defaultProps = Object.keys(this)
    .filter(function (prop) {
      return prop.substr(0, 3) === '_p_'
        && !/_p_(continueOnFail|nextIndex)/.test(prop)
    })
    .map(function (prop) {
      return prop.substr(3)
    })
}