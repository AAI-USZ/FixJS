function displaySlide(n) {
  n = Math.min(n, slides.length-1);
  n = Math.max(n, 0);

  var s = slides.eq(n);
  var top = s.offset().top;

  var padding = {
    "DIV": s.offset().top,
    "H1":  150,
    "H2":  20
  }[slides[n].tagName];

  $(document).scrollTop(top - padding);
}