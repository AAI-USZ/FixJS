function cameraInit() {
    this.switchButton.addEventListener('click', this.toggleCamera.bind(this));
    this.galleryButton.addEventListener('click', function() {
      // This is bad. It should eventually become a Web Intent.
      var host = document.location.host;
      var domain = host.replace(/(^[\w\d]+\.)?([\w\d]+\.[a-z]+)/, '$2');
      window.parent.WindowManager.launch('http://gallery.' + domain);
    });

    this.setSource(this._camera);
  }