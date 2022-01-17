function() {
    if (this.domNode.children.length > 1) {
      console.error('mulberry.ui.Scrollable::_makeScroller: More than one child element. Only the first one will be scrollable. Probably not what you want!');
    }

    this.scroller = new iScroll(this.domNode, {
      vScrollbar: false,
      onScrollStart : dojo.hitch(this, 'onScrollStart'),
      onScrollEnd : dojo.hitch(this, 'onScrollEnd')
    });

    this._resetSnapshot();
    this.scroller.refresh();
  }