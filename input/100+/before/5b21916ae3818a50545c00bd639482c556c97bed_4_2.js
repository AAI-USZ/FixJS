function(Backbone, Templates, SlidePreviewPanel, OperatingTable, EventEmitter, empty, ButtonBarView, PictureGrabber, Keymaster) {
  return Backbone.View.extend({
    className: "slideEditor",
    initialize: function() {
      var _this = this;
      this.name = "Slide Editor";
      $(window).resize(function() {
        return _this.resized();
      });
      this.operatingTable = new OperatingTable();
      this.slidePreviewPanel = new SlidePreviewPanel({
        model: this.model
      });
      return this.model.on("change:activeSlide", this._activeSlideChanged, this);
    },
    show: function() {
      this.hidden = false;
      this.$el.removeClass("disp-none");
      Keymaster.setScope("slidePreviewPanel");
      if (this.hiddenActiveChange != null) {
        this.operatingTable.setModel(this.hiddenActiveChange);
        return this.hiddenActiveChange = null;
      }
    },
    cut: function() {
      var component;
      component = this[Keymaster.getScope()];
      if (component != null) {
        component.cut();
      }
      return true;
    },
    copy: function() {
      var component;
      component = this[Keymaster.getScope()];
      if (component != null) {
        component.copy();
      }
      return true;
    },
    paste: function() {
      var component;
      component = this[Keymaster.getScope()];
      if (component != null) {
        component.paste();
      }
      return true;
    },
    backgroundChanged: function(newBG) {
      return this.operatingTable.backgroundChanged(newBG);
    },
    hide: function() {
      this.hidden = true;
      return this.$el.addClass("disp-none");
    },
    _activeSlideChanged: function(model, newSlide) {
      if (!this.hidden) {
        return this.operatingTable.setModel(newSlide);
      } else {
        return this.hiddenActiveChange = newSlide;
      }
    },
    render: function() {
      var $items, $mainContent, pictureGrabber;
      this.$el.html(Templates.SlideEditor(this.model));
      this.$el.find(".dropdown-toggle").dropdown();
      $items = this.$el.find("a[title]");
      $items.tooltip({
        placement: 'bottom',
        delay: {
          show: 1000,
          hide: 100
        }
      }).click(function() {
        return $items.tooltip('hide');
      });
      $mainContent = this.$el.find(".mainContent");
      this.$slidePreviewPanel = this.slidePreviewPanel.render();
      this.$operatingTable = this.operatingTable.render();
      $mainContent.append(this.$slidePreviewPanel);
      $mainContent.append(this.$operatingTable);
      this.resized();
      if (this._buttonBar != null) {
        this._buttonBar.dispose();
      }
      pictureGrabber = new PictureGrabber();
      this.$el.append(pictureGrabber.render());
      this._buttonBar = new ButtonBarView({
        el: this.$el.find(".buttonBar"),
        deck: this.model,
        pictureGrabber: pictureGrabber
      });
      this._buttonBar.render();
      return this.$el;
    },
    resized: function() {
      if (this.$operatingTable) {
        this.$slidePreviewPanel.css("height", window.innerHeight - 80);
        this.$operatingTable.css({
          height: window.innerHeight - 80,
          width: window.innerWidth - 150
        });
        return this.operatingTable.resized();
      }
    }
  });
}