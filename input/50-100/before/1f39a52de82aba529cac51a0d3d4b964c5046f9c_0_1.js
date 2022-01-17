function(el) {
    if (!goog.isNull(this.fill_)) {
        this.fill_.setDOMStyle(el, this);
    }
    if (!goog.isNull(this.stroke_)) {
        this.stroke_.setDOMStyle(el, this);
    } else {
        el.style.border='none';
    }
}