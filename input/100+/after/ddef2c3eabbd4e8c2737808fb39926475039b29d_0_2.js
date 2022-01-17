function (callback) {
    var previousId = IconResizing.id;
    IconResizing.id = $(".ui-2#editor").attr("active-edit-id");
    IconResizing.previewTile = $(".ui-2#editor #preview-tile, #widget-holder #" + IconResizing.id), 
    IconResizing.tileImg = $("#invisible-tile-img");
    IconResizing.tileWidth = IconResizing.previewTile.filter(":eq(0)").width();
    IconResizing.tileHeight = IconResizing.previewTile.filter(":eq(0)").height();

    // keep on getting image width, height until get correct one
    var handler = setInterval(function() {
      var newImgWidth = IconResizing.tileImg.width();
      var newImgHeight = IconResizing.tileImg.height();
      if (newImgWidth != 0) {
        // if image is changed then reset its position and zoom level
        if (IconResizing.id == previousId && (IconResizing.imgWidth != newImgWidth || IconResizing.imgHeight != newImgHeight)) {
          IconResizing.imgWidth = newImgWidth;
          IconResizing.imgHeight = newImgHeight;
          IconResizing.sizeRatio = IconResizing.imgWidth / IconResizing.imgHeight;
          IconResizing.resetTileIcon();
        }
        else {
          IconResizing.imgWidth = newImgWidth;
          IconResizing.imgHeight = newImgHeight;
          IconResizing.sizeRatio = IconResizing.imgWidth / IconResizing.imgHeight;
        }
        clearInterval(handler);
        if (callback) {
          callback();
        }
      }
    }, 50);
  }