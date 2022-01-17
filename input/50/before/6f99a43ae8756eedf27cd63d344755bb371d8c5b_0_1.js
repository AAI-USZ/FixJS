function (w, h) {
        $heatmap_canvas.attr('width',  w / backing_scale);
        $heatmap_canvas.attr('height', h / (backing_scale*2));
      }