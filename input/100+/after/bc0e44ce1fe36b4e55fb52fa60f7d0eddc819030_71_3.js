function() {
      this.toaster.classList.remove('displayed');
      this._toasterTimeout = null;
      this._toasterGD.stopDetecting();
    }