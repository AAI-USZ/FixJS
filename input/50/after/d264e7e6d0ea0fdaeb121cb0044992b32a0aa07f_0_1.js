function (opt_orient) {
  if (opt_orient & goog.ui.Scroller.ORIENTATION.HORIZONTAL) return this.hscrollableRange_;
  return this.vscrollableRange_;
}