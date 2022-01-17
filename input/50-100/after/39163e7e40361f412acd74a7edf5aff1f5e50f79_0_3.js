function (e) {

        e.preventDefault();

        movement = true;

        var pageX = e.touches[0].pageX,
          pageY = e.touches[0].pageY,
          pos = this.getEventPosition(e.touches[0]);

        if (!touchend) {
          E.fire(el, 'flotr:mousemove', [event, pos, this]);
        }
        this.lastMousePos = pos;
      }