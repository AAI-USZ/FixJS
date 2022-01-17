function () {
      $heatmap_canvas = $('<canvas />');
      $heatmap_canvas.attr('id', html_id || DEFAULT_ID);
      canvas_ctx = $heatmap_canvas[0].getContext('2d');
      // If we are being rendered on a retina display with doubled pixels
      // we need to make the actual canvas half the requested size;
      // Google: window.devicePixelRatio webkitBackingStorePixelRatio
      // See: https://www.khronos.org/webgl/public-mailing-list/archives/1206/msg00193.html
      if (window.devicePixelRatio > 1 && 
          (canvas_ctx.webkitBackingStorePixelRatio > 1 || (typeof canvas_ctx.webkitBackingStorePixelRatio === "undefined"))) {
        backing_scale_width = window.devicePixelRatio;
        backing_scale_height = backing_scale_width * 2
      } else {
        backing_scale_width = 1;
        backing_scale_height = 1;
      }
    }