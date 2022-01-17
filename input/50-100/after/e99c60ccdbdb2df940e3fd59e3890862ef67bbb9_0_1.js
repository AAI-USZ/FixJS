function(event) {
    var newBackgroundPos = {};
    newBackgroundPos.X = (IconDragging.backgroundPos.X + event.clientX - IconDragging.mouseStartPos.X) + "px";
    newBackgroundPos.Y = (IconDragging.backgroundPos.Y + event.clientY - IconDragging.mouseStartPos.Y) + "px";
    IconDragging.tile.css("background-position", newBackgroundPos.X + " " + newBackgroundPos.Y + ", 100% 100%");
  }