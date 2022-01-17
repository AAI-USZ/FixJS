function() {
    var t = $(this);
    t.hide();
    t.click(function() {
      self.timeline.previous();
      self.scene.previous();
    });
  }