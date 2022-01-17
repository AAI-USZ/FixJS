function tabSwipe_swipe(e) {
      if (!this.deleteable || this.browser.inTransition) {
        return;
      }

      var distance = e.detail.start.screenX - e.detail.end.screenX;
      var fastenough = Math.abs(e.detail.vx) > this.TRANSITION_SPEED;
      var farenough = Math.abs(distance) >
        this.containerWidth * this.TRANSITION_FRACTION;

      if (!(farenough || fastenough)) {
        // Werent far or fast enough to delete, restore
        var time = Math.abs(distance) / this.TRANSITION_SPEED;
        var transition = 'left ' + time + 'ms linear';
        this.tab.style.MozTransition = transition;
        this.tab.style.left = '0px';
        this.tab.style.opacity = 1;
        this.tab.classList.remove('active');
        return;
      }

      var speed = Math.max(Math.abs(e.detail.vx), 1.8);
      var time = (this.containerWidth - Math.abs(distance)) / speed;
      var offset = e.detail.direction === 'right' ?
        this.containerWidth : -this.containerWidth;

      this.deleteTab(time, offset);
    }