function pv_setCoverImage(image) {
    // Reset the image to be ready for fade-in
    this.coverImage.src = '';
    this.coverImage.classList.remove('fadeIn');

    // Set source to image and crop it to be fitted when it's onloded
    if (image) {
      this.coverImage.src = createBase64URL(image);
      this.coverImage.addEventListener('load', pv_showImage.bind(this));
    }

    function pv_showImage(evt) {
      cropImage(evt);
      this.coverImage.classList.add('fadeIn');
    };
  }