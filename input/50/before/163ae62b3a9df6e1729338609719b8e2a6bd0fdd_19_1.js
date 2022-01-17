function(template, vars) {
        renderer.render(target + " .contents", template, vars);
        dom.addClass(BODY, className);
        this.visible = true;
      }