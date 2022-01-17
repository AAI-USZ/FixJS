function(content, _arg) {
        var level, scroll, slideDirection, title, _ref, _ref1;
        _ref = _arg != null ? _arg : {}, scroll = _ref.scroll, title = _ref.title, level = _ref.level;
        fimo.events.fire("newPage");
        slideDirection = void 0;
        if (scroll == null) {
          scroll = false;
        }
        if ((_ref1 = this.scrollable) == null) {
          this.scrollable = void 0;
        }
        if (level == null) {
          level = void 0;
        }
        if (level) {
          if (level > this.currentLevel) {
            slideDirection = "right";
          } else if (level < this.currentLevel) {
            slideDirection = "left";
          }
          this.currentLevel = level;
        }
        this.$title = $("#navbar-title");
        if (title) {
          this.$title.text(title);
        } else {
          this.$title.html("&nbsp;");
        }
        this.$page.hide();
        this.$second.hide();
        this.destroyPage();
        this.$page.html(content);
        if (scroll) {
          this.scrollable = new iScroll(this.$page[0], {
            hScrollbar: false,
            vScrollbar: false
          });
        }
        if (slideDirection) {
          return this.slideIn(slideDirection);
        } else {
          this.$page.show();
          return setTimeout(function() {
            fimo.events.fire("pageLoaded");
            if (this.scrollable) {
              return this.scrollable.refresh();
            }
          }, 0);
        }
      }