function() {
    // View source is always OK, unless in directory listing.
    this.showItem("context-viewpartialsource-selection",
                  this.isContentSelected && !this.onTextInput);
    this.showItem("context-viewpartialsource-mathml",
                  this.onMathML && !this.isContentSelected);

    var showView = !(this.inDirList || this.onImage || this.isContentSelected ||
                     this.onCanvas || this.onVideo || this.onAudio ||
                     this.onLink || this.onTextInput);

    this.showItem("context-viewsource", showView);
    this.showItem("context-viewinfo", showView);

    this.showItem("context-sep-properties",
                  !(this.inDirList || this.isContentSelected || this.onTextInput ||
                    this.onCanvas || this.onVideo || this.onAudio));
    // Set As Wallpaper depends on whether an image was clicked on,
    // and requires the shell service.
    var hasShell = "@mozilla.org/suite/shell-service;1" in Components.classes;
    this.showItem("context-setWallpaper",
                  hasShell && (this.onLoadedImage || this.onStandaloneImage));

    this.showItem("context-sep-image",
                  this.onLoadedImage || this.onStandaloneImage);

    if (hasShell && this.onLoadedImage)
      // Disable the Set As Wallpaper menu item if we're still trying to load the image
      this.setItemAttr("context-setWallpaper", "disabled",
                       (("complete" in this.target) && !this.target.complete) ? "true" : null);

    this.showItem("context-fitimage", this.onStandaloneImage &&
                                      content.document.imageResizingEnabled);
    if (this.onStandaloneImage && content.document.imageResizingEnabled) {
      this.setItemAttr("context-fitimage", "disabled",
                       content.document.imageIsOverflowing ? null : "true");
      this.setItemAttr("context-fitimage", "checked",
                       content.document.imageIsResized ? "true" : null);
    }

    this.showItem("context-reloadimage", this.onImage);

    // View image depends on having an image that's not standalone
    // (or is in a frame), or a canvas.
    this.showItem("context-viewimage",
                  (this.onImage && (!this.inSyntheticDoc || this.inFrame)) ||
                  this.onCanvas);

    // View video depends on not having a standalone video.
    this.showItem("context-viewvideo", this.onVideo &&
                                       (!this.inSyntheticDoc || this.inFrame));
    this.setItemAttr("context-viewvideo", "disabled", !this.mediaURL);

    // View background image depends on whether there is one, but don't make
    // background images of a stand-alone media document available
    this.showItem("context-viewbgimage", showView && !this.inSyntheticDoc);
    this.showItem("context-sep-viewbgimage", showView && !this.inSyntheticDoc);
    this.setItemAttr("context-viewbgimage", "disabled", this.hasBGImage ? null : "true");

    // Hide Block and Unblock menuitems.
    this.showItem("context-blockimage", false);
    this.showItem("context-unblockimage", false);

    // Block image depends on whether an image was clicked on.
    if (this.onImage) {
      var uri = Services.io.newURI(this.mediaURL, null, null);
      if (uri instanceof Components.interfaces.nsIURL && uri.host) {
        var serverLabel = uri.host;
        // Limit length to max 15 characters.
        serverLabel = serverLabel.replace(/^www\./i, "");
        if (serverLabel.length > 15)
          serverLabel = serverLabel.substr(0, 15) + this.ellipsis;

        // Set label and accesskey for appropriate action and unhide menuitem.
        var id = "context-blockimage";
        var attr = "blockImage";
        if (Services.perms.testPermission(uri, "image") == Services.perms.DENY_ACTION) {
          id = "context-unblockimage";
          attr = "unblockImage";
        }
        const bundle = document.getElementById("contentAreaCommandsBundle");
        this.setItemAttr(id, "label",
                         bundle.getFormattedString(attr, [serverLabel]));
        this.setItemAttr(id, "accesskey",
                         bundle.getString(attr + ".accesskey"));
        this.showItem(id, true);
      }
    }
  }