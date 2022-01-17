function(target) {
        if (arcDragOrigin) {
          target.removeClass('badTarget');
          arcDragOriginGroup.removeClass('highlight');
          if (target) {
            target.parent().removeClass('highlight');
          }
          if (arcDragArc) {
            svg.remove(arcDragArc);
            arcDrag = null;
          }
          arcDragOrigin = null;
          if (arcOptions) {
              $('g[data-from="' + arcOptions.origin + '"][data-to="' + arcOptions.target + '"]').removeClass('reselect');
          }
          svgElement.removeClass('reselect');
        }
        $('.reselectTarget').removeClass('reselectTarget');
      }