function() {
      var events;
      events = this.events;
      if (!this.options.disableResize) this.win.unbind(RESIZE, events[RESIZE]);
      this.slider.unbind(MOUSEDOWN, events[DOWN]);
      this.pane.unbind(MOUSEDOWN, events[PANEDOWN]).unbind("" + MOUSEWHEEL + " " + DOMSCROLL, events[WHEEL]);
      this.content.unbind("" + SCROLL + " " + MOUSEWHEEL + " " + DOMSCROLL + " " + TOUCHMOVE, events[SCROLL]).unbind(KEYDOWN, events[KEYDOWN]).unbind(KEYUP, events[KEYUP]);
    }