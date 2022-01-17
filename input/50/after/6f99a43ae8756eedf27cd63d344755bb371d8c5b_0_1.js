function (w, h) {
        $heatmap_canvas.attr('width',  w / backing_scale_width);
        $heatmap_canvas.attr('height', h / (backing_scale_height));
      }