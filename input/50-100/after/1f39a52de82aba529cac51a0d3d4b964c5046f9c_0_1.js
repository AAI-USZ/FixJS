function(el) {
    if (!goog.isNull(this.fill_)) {
        this.fill_.setDOMStyle(el, this);
    }
    if (!goog.isNull(this.stroke_)) {
        this.stroke_.setDOMStyle(el, this);
    } else {
        goog.style.setStyle(el, 'border-width', 0);
    }
}