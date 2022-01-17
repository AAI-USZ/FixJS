function() {
    var frame = this.frame

    frame.$.pjax({
      url: "hello.html",
      container: "#main",
      success: function() {
        equal(frame.$("#main").html().trim(), "<p>Hello!</p>")
        start()
      }
    })
  }