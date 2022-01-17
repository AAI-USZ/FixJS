function () {

    var
      el = this.el,
      touchendHandler, movement, touchend;

    if ('ontouchstart' in el) {

      touchendHandler = _.bind(function (e) {
        touchend = true;
        E.stopObserving(document, 'touchend', touchendHandler);
        E.fire(el, 'flotr:mouseup', [event, this]);
        if (!movement) {
          this.clickHandler(e);
        }
      }, this);

      this.observe(this.overlay, 'touchstart', _.bind(function (e) {
        movement = false;
        touchend = false;
        this.ignoreClick = false;
        E.fire(el, 'flotr:mousedown', [event, this]);
        this.observe(document, 'touchend', touchendHandler);
      }, this));

      this.observe(this.overlay, 'touchmove', _.bind(function (e) {

        e.preventDefault();

        movement = true;

        var pageX = e.touches[0].pageX,
          pageY = e.touches[0].pageY,
          pos = this.getEventPosition(e.touches[0]);

        if (!touchend) {
          E.fire(el, 'flotr:mousemove', [event, pos, this]);
        }
        this.lastMousePos = pos;
      }, this));

    } else {
      this.
        observe(this.overlay, 'mousedown', _.bind(this.mouseDownHandler, this)).
        observe(el, 'mousemove', _.bind(this.mouseMoveHandler, this)).
        observe(this.overlay, 'click', _.bind(this.clickHandler, this)).
        observe(el, 'mouseout', function () {
          E.fire(el, 'flotr:mouseout');
        });
    }
  }