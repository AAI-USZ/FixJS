function() {
      var events;
      events = this.events;
      if (!this.options.disableResize) {
        this.win.bind(RESIZE, events[RESIZE]);
      }
      this.slider.bind(MOUSEDOWN, events[DOWN]);
      this.pane.bind(MOUSEDOWN, events[PANEDOWN]).bind(MOUSEWHEEL, events[WHEEL]).bind(DOMSCROLL, events[WHEEL]);
      this.content.bind(MOUSEWHEEL, events[SCROLL]).bind(DOMSCROLL, events[SCROLL]).bind(TOUCHMOVE, events[SCROLL]).bind(KEYDOWN, events[KEYDOWN]).bind(KEYUP, events[KEYUP]);
    }