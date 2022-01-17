function (opt_orient) {
  if (opt_orient & goog.ui.Scroller.ORIENTATION.HORIZONTAL) return this.vscrollableRange_;
  return this.hscrollableRange_;
}