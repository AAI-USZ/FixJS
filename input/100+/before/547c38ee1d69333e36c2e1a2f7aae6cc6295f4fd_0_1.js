function(title)
  {
    this.base(arguments, title);

    this.set({
      contentPadding: 0,
      showClose: false,
      showMinimize: false,
      width: 300,
      height: 400
    });
    this.setLayout(new qx.ui.layout.Grow());
    this.moveTo(30, 50);
    this.open();

    this.itemHeight = 60;
    this.itemWidth = 60;
    this.itemCount = 431;
    this.itemPerLine = 1;
    this.items = this._generateItems(this.itemCount);

    var scroller = this._createScroller();
    scroller.set({
      scrollbarX: "off",
      scrollbarY: "auto"
    });
    scroller.getPane().addListener("resize", this._onPaneResize, this);
    this.add(scroller);

    this.manager = new qx.ui.virtual.selection.CellRectangle(scroller.getPane(), this).set({
      mode: "multi",
      drag: true
    });
    this.manager.attachMouseEvents();
    this.manager.attachKeyEvents(scroller);
  }