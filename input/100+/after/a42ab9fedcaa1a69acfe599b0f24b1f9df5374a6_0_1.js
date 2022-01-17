function(e) {
  document.body.classList.add('loaded'); // Add loaded class for templates to use.

  this.slides = this.container.querySelectorAll('slide:not([hidden]):not(.backdrop)');

  // If we're on a smartphone, apply special sauce.
  if (Modernizr.mq('only screen and (max-device-width: 480px)')) {
    // var style = document.createElement('link');
    // style.rel = 'stylesheet';
    // style.type = 'text/css';
    // style.href = this.CSS_DIR_ + 'phone.css';
    // document.querySelector('head').appendChild(style);

    // No need for widescreen layout on a phone.
    this.container.classList.remove('layout-widescreen');
  }

  this.loadConfig_(SLIDE_CONFIG);
  this.addEventListeners_();
  this.updateSlides_();

  // Add slide numbers and total slide count metadata to each slide.
  var that = this;
  for (var i = 0, slide; slide = this.slides[i]; ++i) {
    slide.dataset.slideNum = i + 1;
    slide.dataset.totalSlides = this.slides.length;

    slide.addEventListener('click', function(e) {
      if (document.body.classList.contains('overview')) {
        that.loadSlide(this.dataset.slideNum);
        e.preventDefault();
        window.setTimeout(function() {
          that.toggleOverview();
        }, 500);
      }
    }, false);
  }

  // Note: this needs to come after addEventListeners_(), which adds a
  // 'keydown' listener that this controller relies on.
  // Also, no need to set this up if we're on mobile.
  if (!Modernizr.touch) {
    this.controller = new SlideController(this);
    if (this.controller.isPopup) {
      document.body.classList.add('popup');
    }
  }
}