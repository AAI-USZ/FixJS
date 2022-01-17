function() {
  var self = this;
  this.indexOf = {};
  /* elements subjects to the parallax effect must be contained in a block of
   * 100% width with hidden overflow. */

  this.timeline = new $.msw.Timeline("#timeline", {
    listSelector: "ol",
    itemWidth: 350,
/*    velocity: 200, // px/s */
  });

  // Position scene elements
  var width = parseInt($("#scene").innerWidth());
  this.scene = new $.msw.Timeline("#scene", {
    listSelector: "div",
    itemWidth: function() { return parseInt($("#scene").innerWidth()); },
    autoResize: true,
/*    velocity: 800, */
  });

  // Enable previous/next buttons
  $(".prev").each(function() {
    $(this).click(function() {
      self.timeline.previous();
      self.scene.previous();
    });
  });
  $(".next").each(function() {
    $(this).click(function() {
      self.timeline.next();
      self.scene.next();
    });
  });

  // direct links in timeline
  var directAccess = $("#timeline a");
  for(var i = 0; i < directAccess.length; ++i) {
    var link = directAccess[i].href.slice(directAccess[i].href.indexOf('#'));
    this.indexOf[link] = i;
    $(directAccess[i]).click(function(e) {
      var index = self.indexOf[this.href.slice(this.href.indexOf('#'))];
      self.timeline.moveTo(index);
      self.scene.moveTo(index);
      e.stopImmediatePropagation();
    });
  }

  // Position to element if defined in url
  if(location.hash && this.indexOf[location.hash]) {
    var index = this.indexOf[location.hash];
    self.timeline.moveTo(index);
    self.scene.moveTo(index);
  }
}