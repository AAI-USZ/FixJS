function (callback) {
    IconResizing.id = $(".ui-2#editor").attr("active-edit-id");
    IconResizing.previewTile = $(".ui-2#editor #preview-tile, #widget-holder #" + IconResizing.id), 
    IconResizing.tileImg = $("#invisible-tile-img");
    IconResizing.tileWidth = IconResizing.previewTile.filter(":eq(0)").width();
    IconResizing.tileHeight = IconResizing.previewTile.filter(":eq(0)").height();

    // keep on getting image width, height until get correct one
    var handler = setInterval(function() {
      IconResizing.imgWidth = IconResizing.tileImg.width();
      IconResizing.imgHeight = IconResizing.tileImg.height();
      if (IconResizing.imgWidth != 0) {
        IconResizing.sizeRatio = IconResizing.imgWidth / IconResizing.imgHeight;
        clearInterval(handler);
        if (callback) {
          callback();
        }
      }
    }, 50);
  }