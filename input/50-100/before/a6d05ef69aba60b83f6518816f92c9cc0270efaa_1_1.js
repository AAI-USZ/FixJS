function getCaret() {
    /* Credit to MarkB29:
     * http://stackoverflow.com/a/2897510/618906
     */
    var input = this.tbox.get(0);
    if ('selectionStart' in input) {
      // Standard-compliant browsers
      return input.selectionStart;
    } else if (document.selection) {
      // IE
      input.focus();
      var sel = document.selection.createRange();
      var selLen = document.selection.createRange().text.length;
      sel.moveStart('character', -input.value.length);
      return sel.text.length - selLen;
    }
  }