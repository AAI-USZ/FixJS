function (e) {
        movement = false;
        touchend = false;
        this.ignoreClick = false;
        E.fire(el, 'flotr:mousedown', [event, this]);
        this._observe(document, 'touchend', touchendHandler);
      }