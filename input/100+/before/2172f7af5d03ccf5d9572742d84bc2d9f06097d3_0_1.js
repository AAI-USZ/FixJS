function(evt) {
        // must be logged in
        if (that.user === null) return;
        // must not be reselecting a span or an arc
        if (reselectedSpan || arcDragOrigin) return;

        var target = $(evt.target);
        var id;

        // do we edit an arc?
        if (id = target.attr('data-arc-role')) {
          // TODO
          window.getSelection().removeAllRanges();
          var originSpanId = target.attr('data-arc-origin');
          var targetSpanId = target.attr('data-arc-target');
          var type = target.attr('data-arc-role');
          var originSpan = data.spans[originSpanId];
          var targetSpan = data.spans[targetSpanId];
          arcOptions = {
            action: 'createArc',
            origin: originSpanId,
            target: targetSpanId,
            old_target: targetSpanId,
            type: type,
            old_type: type,
            collection: coll,
            'document': doc
          };
          var eventDescId = target.attr('data-arc-ed');
          if (eventDescId) {
            var eventDesc = data.eventDescs[eventDescId];
            if (eventDesc.equiv) {
              arcOptions['left'] = eventDesc.leftSpans.join(',');
              arcOptions['right'] = eventDesc.rightSpans.join(',');
            }
          }
          $('#arc_origin').text(Util.spanDisplayForm(spanTypes, originSpan.type) + ' ("' + data.text.substring(originSpan.from, originSpan.to) + '")');
          $('#arc_target').text(Util.spanDisplayForm(spanTypes, targetSpan.type) + ' ("' + data.text.substring(targetSpan.from, targetSpan.to) + '")');
          var arcId = originSpanId + '--' + type + '--' + targetSpanId; // TODO
          var arcAnnotatorNotes = ''; // TODO fill from info to be provided by server
          fillArcTypesAndDisplayForm(evt, originSpan.type, targetSpan.type, type, arcId, arcAnnotatorNotes);
          // for precise timing, log dialog display to user.
          dispatcher.post('logAction', ['arcEditSelected']);

        // if not an arc, then do we edit a span?
        } else if (id = target.attr('data-span-id')) {
          window.getSelection().removeAllRanges();
          editedSpan = data.spans[id];
          spanOptions = {
            action: 'createSpan',
            start: editedSpan.from,
            end: editedSpan.to,
            type: editedSpan.type,
            id: id,
          };
          var spanText = data.text.substring(editedSpan.from, editedSpan.to);
          fillSpanTypesAndDisplayForm(evt, spanText, editedSpan);
          // for precise timing, log annotation display to user.
          dispatcher.post('logAction', ['spanEditSelected']);
        }

        // if not an arc or a span, is this a double-click on text?
        else if (id = target.attr('data-chunk-id')) {
          // remember what was clicked (this is in preparation for
          // simulating double-click selection on browsers that do
          // not support it.
          lastDoubleClickedChunkId = id;
        }
      }