function() {
      var $items, $mainContent, pictureGrabber, siteGrabber, videoGrabber;
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
      pictureGrabber = new ItemGrabber({
        tag: "img",
        title: "Insert Image"
      });
      siteGrabber = new ItemGrabber({
        tag: "iframe",
        title: "Insert Website"
      });
      videoGrabber = new ItemGrabber({
        tag: "video",
        title: "Insert Video",
        ignoreErrors: true
      });
      this.$el.append(pictureGrabber.render());
      this.$el.append(siteGrabber.render());
      this.$el.append(videoGrabber.render());
      this._buttonBar = new ButtonBarView({
        el: this.$el.find(".buttonBar"),
        deck: this.model,
        pictureGrabber: pictureGrabber,
        siteGrabber: siteGrabber,
        videoGrabber: videoGrabber
      });
      this._buttonBar.render();
      return this.$el;
    }