function enterEmailState(el) {
    if (!$("#email").is(":disabled")) {
      this.submit = checkEmail;
      showHint("start");
    }
  }