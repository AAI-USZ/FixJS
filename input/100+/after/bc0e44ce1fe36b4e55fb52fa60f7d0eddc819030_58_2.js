function slv_setAlbumSrc(url) {
    // Set source to image and crop it to be fitted when it's onloded
    this.albumImage.src = url;
    this.albumImage.classList.remove('fadeIn');
    this.albumImage.addEventListener('load', slv_showImage.bind(this));

    function slv_showImage(evt) {
      cropImage(evt);
      this.albumImage.classList.add('fadeIn');
    };
  }