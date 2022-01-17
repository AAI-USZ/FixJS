function() {
var Else = goog.util.Else;
var something = goog.something;

/** // WRONG_BLANK_LINE_COUNT
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

/** // WRONG_BLANK_LINE_COUNT
 * // +3: MISSING_PRIVATE
 * Missing private.
 */
something.withTrailingUnderscore_ = 'should be declared @private';

/** // WRONG_BLANK_LINE_COUNT
 * Does nothing.
 */
something.Something.prototype.noOp = function() {};
}