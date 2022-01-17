function() {
      var events;
      events = this.events;
      if (!this.options.disableResize) this.win.bind(RESIZE, events[RESIZE]);
      this.slider.bind(MOUSEDOWN, events[DOWN]);
      this.pane.bind(MOUSEDOWN, events[PANEDOWN]).bind("" + MOUSEWHEEL + " " + DOMSCROLL, events[WHEEL]);
      this.content.bind("" + SCROLL + " " + MOUSEWHEEL + " " + DOMSCROLL + " " + TOUCHMOVE, events[SCROLL]).bind(KEYDOWN, events[KEYDOWN]).bind(KEYUP, events[KEYUP]);
    }