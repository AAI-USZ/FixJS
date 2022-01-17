function ls_loadPanel(panel) {
    switch (panel) {
      case 'passcode':
        break;

      case 'camera':
        // load the camera iframe
        this.camera.src = './camera/';
        break;

      case 'emergency':
        break;
    }
  }