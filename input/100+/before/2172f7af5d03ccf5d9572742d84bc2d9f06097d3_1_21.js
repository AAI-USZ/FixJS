function(evt) {
        var target = $(evt.target);
        var id;
        if (id = target.attr('data-span-id')) {
          commentId = id;
          var span = data.spans[id];
          dispatcher.post('displaySpanComment', [
              evt, target, id, span.type, span.attributeText,
              data.text.substring(span.from, span.to),
              span.comment && span.comment.text,
              span.comment && span.comment.type]);

          var spanDesc = spanTypes[span.type];
          var bgColor = ((spanDesc && spanDesc.bgColor) || 
                         (spanTypes.SPAN_DEFAULT && spanTypes.SPAN_DEFAULT.bgColor) ||
                         '#ffffff');
          highlight = svg.rect(highlightGroup,
                               span.highlightPos.x, span.highlightPos.y,
                               span.highlightPos.w, span.highlightPos.h,
                               { 'fill': bgColor, opacity:0.75,
                                 rx: highlightRounding.x,
                                 ry: highlightRounding.y,
                               });

          if (that.arcDragOrigin) {
            target.parent().addClass('highlight');
          } else {
            highlightArcs = $svg.
                find('g[data-from="' + id + '"], g[data-to="' + id + '"]').
                addClass('highlight');
            var spans = {};
            spans[id] = true;
            var spanIds = [];
            $.each(span.incoming, function(arcNo, arc) {
                spans[arc.origin] = true;
            });
            $.each(span.outgoing, function(arcNo, arc) {
                spans[arc.target] = true;
            });
            $.each(spans, function(spanId, dummy) {
                spanIds.push('rect[data-span-id="' + spanId + '"]');
            });
            highlightSpans = $svg.
                find(spanIds.join(', ')).
                parent().
                addClass('highlight');
          }
          forceRedraw();
        } else if (!that.arcDragOrigin && (id = target.attr('data-arc-role'))) {
          var originSpanId = target.attr('data-arc-origin');
          var targetSpanId = target.attr('data-arc-target');
          var role = target.attr('data-arc-role');
          var symmetric = (relationTypesHash[role] && 
                           relationTypesHash[role].properties &&
                           relationTypesHash[role].properties.symmetric);
          // NOTE: no commentText, commentType for now
          var arcEventDescId = target.attr('data-arc-ed');
          var commentText = '';
          var commentType = '';
          var arcId;
          if (arcEventDescId) {
            var eventDesc = data.eventDescs[arcEventDescId];
            var comment = eventDesc.comment;
            if (comment) {
              commentText = comment.text;
              commentType = comment.type;
              if (commentText == '' && commentType) {
                  // default to type if missing text
                  commentText = commentType;
              }
            }
            if (eventDesc.relation) {
              // among arcs, only ones corresponding to relations have
              // "independent" IDs
              arcId = arcEventDescId;
            }
          }
          var originSpanType = data.spans[originSpanId].type || '';
          var targetSpanType = data.spans[targetSpanId].type || '';
          dispatcher.post('displayArcComment', [
              evt, target, symmetric, arcId,
              originSpanId, originSpanType, role,
              targetSpanId, targetSpanType,
              commentText, commentType]);
          highlightArcs = $svg.
              find('g[data-from="' + originSpanId + '"][data-to="' + targetSpanId + '"]').
              addClass('highlight');
          highlightSpans = $($svg).
              find('rect[data-span-id="' + originSpanId + '"], rect[data-span-id="' + targetSpanId + '"]').
              parent().
              addClass('highlight');
        } else if (id = target.attr('data-sent')) {
          var comment = data.sentComment[id];
          if (comment) {
            dispatcher.post('displaySentComment', [evt, target, comment.text, comment.type]);
          }
        }
      }