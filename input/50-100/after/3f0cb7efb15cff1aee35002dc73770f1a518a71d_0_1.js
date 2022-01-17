function(page) {
        if (this.__currentPage != page) {
          return;
        }
        var view = page.getContent().getView();

        this.__content.add(view, {edge: 0});
        // Opera 12 will sometimes scroll the page down, messing up the header
        // layout
        if (qx.core.Environment.get("browser.name") == "opera") {
          window.setTimeout(function() {
            view.show();
          }, 100);
        }
        else {
          view.show();
        }

        this.__fadeIn(view);
      }