function(_, _super) {
  _.init = function(cmd, html, text) {
    _super.init.call(this, cmd, [ html ], [ text ]);
  };

  _.latex = function() {
    var latex = this.firstChild.latex();
    if (latex.length === 1)
      return this.cmd + latex;
    else
      return this.cmd + '{' + (latex || ' ') + '}';
  };
  _.redraw = function() {
    if (this.prev)
      this.prev.respace();
    //SupSub::respace recursively calls respace on all the following SupSubs
    //so if prev is a SupSub, no need to call respace on this or following nodes
    if (!(this.prev instanceof SupSub)) {
      this.respace();
      //and if next is a SupSub, then this.respace() will have already called
      //this.next.respace()
      if (this.next && !(this.next instanceof SupSub))
        this.next.respace();
    }
  };
  _.respace = function() {
    if (
      this.prev.cmd === '\\int ' || (
        this.prev instanceof SupSub && this.prev.cmd != this.cmd
        && this.prev.prev && this.prev.prev.cmd === '\\int '
      )
    ) {
      if (!this.limit) {
        this.limit = true;
        this.jQ.addClass('limit');
      }
    }
    else {
      if (this.limit) {
        this.limit = false;
        this.jQ.removeClass('limit');
      }
    }

    this.respaced = this.prev instanceof SupSub && this.prev.cmd != this.cmd && !this.prev.respaced;
    if (this.respaced) {
      var fontSize = +this.jQ.css('fontSize').slice(0,-2),
        prevWidth = this.prev.jQ.outerWidth()
        thisWidth = this.jQ.outerWidth();
      this.jQ.css({
        left: (this.limit && this.cmd === '_' ? -.25 : 0) - prevWidth/fontSize + 'em',
        marginRight: .1 - min(thisWidth, prevWidth)/fontSize + 'em'
          //1px extra so it doesn't wrap in retarded browsers (Firefox 2, I think)
      });
    }
    else if (this.limit && this.cmd === '_') {
      this.jQ.css({
        left: '-.25em',
        marginRight: ''
      });
    }
    else {
      this.jQ.css({
        left: '',
        marginRight: ''
      });
    }

    if (this.next instanceof SupSub)
      this.next.respace();

    return this;
  };
}