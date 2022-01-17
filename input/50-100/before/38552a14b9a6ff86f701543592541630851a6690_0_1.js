function(evt) {
    evt && evt.preventDefault()

    var remixUrl = "https://makr.io/posts/" + this.model.id + "/remix"
      , caption = "made on <a href='https://www.makr.io'>makr.io</a> | <a href='" + remixUrl + "'>remix this</a>"
      , source = this.model.get("screenshot_url")
      , url = "http://www.tumblr.com/share/photo?" +
              "source=" + encodeURIComponent(source) +
              "&caption=" + encodeURIComponent(caption) +
              "&clickthru=" + encodeURIComponent(source)

    this.launchWindow(url)
  }