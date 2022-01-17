function(template, vars) {
        renderer.render(target + " .contents", template, vars);
        dom.addClass(BODY, className);
        dom.fireEvent(window, "resize");
        this.visible = true;
      }