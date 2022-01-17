function(e) {
      p.__mousePressed = true;
      p.mouseDragging = false;
      switch (e.which) {
      case 1:
        p.mouseButton = PConstants.LEFT;
        break;
      case 2:
        p.mouseButton = PConstants.CENTER;
        break;
      case 3:
        p.mouseButton = PConstants.RIGHT;
        break;
      }

      if (typeof p.mousePressed === "function") {
        p.mousePressed();
      }
    }