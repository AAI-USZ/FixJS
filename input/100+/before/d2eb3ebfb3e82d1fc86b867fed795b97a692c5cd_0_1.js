function() {
    if ((location.hash == "") || (location.hash == "#undefined")) {
      showDefaultPage();
    } else {
      showPage(location.hash);
    }
  }