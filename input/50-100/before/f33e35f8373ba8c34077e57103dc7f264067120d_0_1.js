function() {
    var frame = this.frame

    var startCalled

    frame.$("#main").on("pjax:start", function() {
      startCalled = this
    })

    frame.$.pjax({
      url: "hello.html",
      container: "#main",
      success: function() {
        equal(startCalled, frame.$("#main")[0])
        start()
      }
    })
  }