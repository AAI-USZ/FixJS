function ls_loadPanel(panel, callback) {
    switch (panel) {
      case 'passcode':
      case 'emergency':
      default:
        if (callback)
          callback();
        break;

      case 'camera':
        // create the iframe and load the camera
        var frame = document.createElement('iframe');
        frame.src = './camera/';
        frame.addEventListener('load', this);
        if (callback) {
          frame.onload = function () {
            callback();
          };
        }
        this.camera.appendChild(frame);
        break;
    }
  }