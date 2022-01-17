function(toolbar) {
        var buttonHolder, buttonset, dialogId, id, widget;
        widget = this;
        dialogId = "" + this.options.uuid + "-image-dialog";
        this.options.dialog = jQuery("<div id=\"" + dialogId + "\">                <div class=\"nav\">                    <ul class=\"tabs\">                    </ul>                    <div id=\"" + this.options.uuid + "-tab-activeIndicator\" class=\"tab-activeIndicator\" />                </div>                <div class=\"dialogcontent\">            </div>");
        if (widget.options.suggestions) {
          this._addGuiTabSuggestions(jQuery(".tabs", this.options.dialog), jQuery(".dialogcontent", this.options.dialog));
        }
        if (widget.options.search || widget.options.searchUrl) {
          this._addGuiTabSearch(jQuery(".tabs", this.options.dialog), jQuery(".dialogcontent", this.options.dialog));
        }
        if (widget.options.upload || widget.options.uploadUrl) {
          this._addGuiTabUpload(jQuery(".tabs", this.options.dialog), jQuery(".dialogcontent", this.options.dialog));
        }
        this.current = jQuery('<div class="currentImage"></div>').halloimagecurrent({
          uuid: this.options.uuid,
          imageWidget: this,
          editable: this.options.editable,
          dialog: this.options.dialog,
          maxWidth: this.options.maxWidth,
          maxHeight: this.options.maxHeight
        });
        jQuery('.dialogcontent', this.options.dialog).append(this.current);
        buttonset = jQuery("<span class=\"" + widget.widgetName + "\"></span>");
        id = "" + this.options.uuid + "-image";
        buttonHolder = jQuery('<span></span>');
        buttonHolder.hallobutton({
          label: 'Images',
          icon: 'icon-picture',
          editable: this.options.editable,
          command: null,
          queryState: false,
          uuid: this.options.uuid,
          cssClass: this.options.buttonCssClass
        });
        buttonset.append(buttonHolder);
        this.button = buttonHolder;
        this.button.bind("change", function(event) {
          if (widget.options.dialog.dialog("isOpen")) {
            return widget._closeDialog();
          } else {
            return widget._openDialog();
          }
        });
        this.options.editable.element.bind("hallodeactivated", function(event) {
          return widget._closeDialog();
        });
        jQuery(this.options.editable.element).delegate("img", "click", function(event) {
          return widget._openDialog();
        });
        buttonset.buttonset();
        toolbar.append(buttonset);
        this.options.dialog.dialog(this.options.dialogOpts);
        return this._handleTabs();
      }