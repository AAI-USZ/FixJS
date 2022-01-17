function show_white_notice() {
  var cssRatings = ".whitelisted {";
  cssRatings += "background: #57b787;";
  if (settings['black_notice']) {
    cssRatings += "top: 50px;";
  } else {
    cssRatings += "top: 20px;";
  }
  cssRatings += "}";
  addGlobalStyle("white_notice_style",cssRatings);
}