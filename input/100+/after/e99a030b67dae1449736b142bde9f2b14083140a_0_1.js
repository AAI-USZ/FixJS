function () {
    // ### 
    var head = document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    if (navigator.userAgent.indexOf('Fennec') != -1) {
      style.innerHTML = '@media only screen { #top-button { display: none !important; } '
        + '#go-more { background-position: 30px 10px; } }';
    } else if (navigator.userAgent.indexOf('WebKit') != -1 && navigator.userAgent.indexOf('Android') != -1) {
      style.innerHTML = '@media only screen { #go-more { background-position: 30px 12px !important;} }';
    } else if (navigator.userAgent.indexOf('Opera') != -1) {
      style.innerHTML = '@media only screen { #go-more { background-position: 30px 12px !important;} }';
    }
    head.appendChild(style);
  }