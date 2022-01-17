function enterEmailState() {
    if (!dom.is("#email", ":disabled")) {
      this.submit = checkEmail;
      showHint("start");
    }
  }