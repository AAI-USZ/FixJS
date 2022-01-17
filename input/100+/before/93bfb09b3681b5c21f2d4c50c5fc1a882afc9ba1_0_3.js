function ls_loadPanel(panel) {
    switch (panel) {
      case 'passcode':
        // Reset passcode panel only if the status is not error
        if (this.overlay.dataset.passcodeStatus == 'error')
          break;

        delete this.overlay.dataset.passcodeStatus;
        this.passCodeEntered = '';
        this.updatePassCodeUI();
        break;

      case 'camera':
        // unload the camera iframe
        this.camera.src = './blank.html';
        break;

      case 'emergency':
        break;

      default:
        this.areaHandle.style.MozTransform =
          this.areaUnlock.style.opacity =
          this.railRight.style.opacity =
          this.areaCamera.style.opacity =
          this.railLeft.style.opacity =
          this.railRight.style.width =
          this.railLeft.style.width = '';
        this.areaHandle.classList.remove('triggered');
        this.areaCamera.classList.remove('triggered');
        this.areaUnlock.classList.remove('triggered');
        break;
    }
  }