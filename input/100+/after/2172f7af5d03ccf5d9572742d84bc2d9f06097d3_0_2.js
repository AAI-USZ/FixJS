function(originId) {
        window.getSelection().removeAllRanges();
        svgPosition = svgElement.offset();
        arcDragOrigin = originId;
        arcDragArc = svg.path(svg.createPath(), {
          markerEnd: 'url(#drag_arrow)',
          'class': 'drag_stroke',
          fill: 'none',
        });
        arcDragOriginGroup = $(data.spans[arcDragOrigin].group);
        arcDragOriginGroup.addClass('highlight');
        arcDragOriginBox = Util.realBBox(data.spans[arcDragOrigin].headFragment);
        arcDragOriginBox.center = arcDragOriginBox.x + arcDragOriginBox.width / 2;

        arcDragJustStarted = true;
      }