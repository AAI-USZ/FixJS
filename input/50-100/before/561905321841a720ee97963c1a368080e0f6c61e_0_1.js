function() {
var Else = goog.util.Else;
var something = goog.something;

/**
 * This is a something.
 * @constructor
 */
something.Something = function() {
  /**
   * This is an else.
   * @type {Else}
   */
  this.myElse = new Else();
};

/**
 * Does nothing.
 */
something.Something.prototype.noOp = function() {};
}