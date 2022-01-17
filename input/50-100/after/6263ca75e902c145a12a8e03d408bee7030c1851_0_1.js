function() {
    var resp = this.httpGet(this.siteUrl);

    var newElem = this.userName = resp.body.querySelector("#nav-your-account .nav-button-em");
    if(newElem != null)
      this.userName = newElem.textContent;
    else
      this.userName = resp.body.querySelector(".navGreeting").textContent.split(', ')[1].slice(0, -1);
  }