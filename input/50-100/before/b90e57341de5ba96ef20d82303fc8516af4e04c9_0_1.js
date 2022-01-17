function() {
  // Run the original _configure.
  var retVal = _configure.apply(this, arguments);

  // If augment is set, do it!
  if (this.augment) {
    // Add the ability to remove all Views.
    this.removeView = LayoutManager.removeView;

    // Add options into the prototype.
    this._options = LayoutManager.prototype._options;

    // Set up this View.
    LayoutManager.setupView(this, this._options());
  }

  // Act like nothing happened.
  return retVal;
}