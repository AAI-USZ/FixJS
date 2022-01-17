function(template, vars) {
        var self=this;

        renderer.render(target + " .contents", template, vars);
        dom.addClass(BODY, className);
        dom.fireEvent(window, "resize");

        // extendedInfo takes care of info that is on a screen but hidden by
        // default.  When the user clicks the "open extended info" button, it
        // is displayed to them.
        self.extendedInfo = bid.Modules.ExtendedInfo.create();
        self.extendedInfo.start({ target: target });

        self.visible = true;
      }