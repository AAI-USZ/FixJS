function(

    element) {

  return goog.dom.getElementsByTagNameAndClass(

      goog.dom.TagName.LABEL, this.getLabelClass(), element)[0];

}