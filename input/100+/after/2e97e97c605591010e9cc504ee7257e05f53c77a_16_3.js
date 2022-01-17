function ls_handleGesture() {
    var touch = this._touch;
    var target = touch.target;
    this.areaHandle.style.MozTransition = null;

    if (!target) {
      this.unloadPanel();
      return;
    }

    var distance = target.offsetLeft - this.areaHandle.offsetLeft -
      (this.areaHandle.offsetWidth - target.offsetWidth) / 2;
    this.areaHandle.classList.add('triggered');

    var transition = 'translateX(' + distance + 'px)';
    var railLength = touch.rightTarget.offsetLeft -
      touch.leftTarget.offsetLeft -
      (this.areaHandle.offsetWidth + target.offsetWidth) / 2;

    var self = this;
    switch (target) {
      case this.areaCamera:
        this.railRight.style.width = railLength + 'px';
        this.railLeft.style.width = '0';

        if (this.areaHandle.style.MozTransform == transition) {
          self.switchPanel('camera');
          break;
        }
        this.areaHandle.style.MozTransform = transition;

        this.areaHandle.addEventListener('transitionend', function goCamera() {
          self.areaHandle.removeEventListener('transitionend', goCamera);
          self.switchPanel('camera');
        });
        break;

      case this.areaUnlock:
        this.railLeft.style.width = railLength + 'px';
        this.railRight.style.width = '0';

        var passcodeOrUnlock = function passcodeOrUnlock() {
          if (!self.passCodeEnabled) {
            self.unlock();
          } else {
            self.switchPanel('passcode');
          }
        };

        if (this.areaHandle.style.MozTransform == transition) {
          passcodeOrUnlock();
          break;
        }
        this.areaHandle.style.MozTransform = transition;

        this.areaHandle.addEventListener('transitionend', function goUnlock() {
          self.areaHandle.removeEventListener('transitionend', goUnlock);
          passcodeOrUnlock();
        });
        break;
    }
  }