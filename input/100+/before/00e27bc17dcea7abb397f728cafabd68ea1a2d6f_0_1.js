function(_, _super) {
  _.ctrlSeq = '\\';
  _.replaces = function(replacedFragment) {
    this._replacedFragment = replacedFragment.detach();
    this.isEmpty = function(){ return false; };
  };
  _.htmlTemplate = ['<span class="latex-command-input">\\</span>'];
  _.textTemplate = ['\\'];
  _.createBefore = function(cursor) {
    _super.createBefore.call(this, cursor);
    this.cursor = cursor.appendTo(this.firstChild);
    if (this._replacedFragment) {
      var el = this.jQ[0];
      this.jQ =
        this._replacedFragment.jQ.addClass('blur').bind(
          'mousedown mousemove', //FIXME: is monkey-patching the mousedown and mousemove handlers the right way to do this?
          function(e) {
            $(e.target = el).trigger(e);
            return false;
          }
        ).insertBefore(this.jQ).add(this.jQ);
    }
  };
  _.latex = function() {
    return '\\' + this.firstChild.latex() + ' ';
  };
  _.keydown = function(e) {
    if (e.which === 9 || e.which === 13) { //tab or enter
      this.renderCommand();
      e.preventDefault();
      return false;
    }
  };
  _.textInput = function(ch) {
    if (ch.match(/[a-z]/i)) {
      this.cursor.deleteSelection();
      this.cursor.insertNew(VanillaSymbol(ch));
      return false;
    }
    this.renderCommand();
    if (ch === ' ' || (ch === '\\' && this.firstChild.isEmpty()))
      return false;
  };
  _.renderCommand = function() {
    this.jQ = this.jQ.last();
    this.remove();
    if (this.next)
      this.cursor.insertBefore(this.next);
    else
      this.cursor.appendTo(this.parent);

    var latex = this.firstChild.latex(), cmd;
    if (latex) {
      if (cmd = LatexCmds[latex]) {
        cmd = cmd(latex);
      }
      else {
        cmd = TextBlock()
        cmd.replaces(latex);
        cmd.firstChild.focus = function(){ delete this.focus; return this; };
        this.cursor.insertNew(cmd).insertAfter(cmd);
        if (this._replacedFragment)
          this._replacedFragment.remove();

        return;
      }
    }
    else
      cmd = VanillaSymbol('\\backslash ','\\');

    if (this._replacedFragment)
      cmd.replaces(this._replacedFragment);
    this.cursor.insertNew(cmd);
  };
}