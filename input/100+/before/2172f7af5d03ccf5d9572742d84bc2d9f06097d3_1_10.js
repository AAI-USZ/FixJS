function(span, x, width, height, reservations) {
        var newSlot = {
          from: x,
          to: x + width,
          span: span,
          height: height + (span.drawCurly ? Configuration.visual.curlyHeight : 0),
        };
        // TODO look at this, and remove if ugly
        // example where it matters: the degenerate case of
        // <REDACTED> look at @14ab7a68cb592821b8d3341957b8dfaa24540e22 for URL
        // (again, it would be solved by individual box reservations instead
        // of row-based)

        // overlapping curly check: TODO delete or uncomment
        /*
        if (span.drawCurly) {
          if (span.curly.from < newSlot.from) newSlot.from = span.curly.from;
          if (span.curly.to > newSlot.to) newSlot.to = span.curly.to;
        }
        */
        var resHeight = 0;
        if (reservations.length) {
          for (var resNo = 0, resLen = reservations.length; resNo < resLen; resNo++) {
            var reservation = reservations[resNo];
            var line = reservation.ranges;
            resHeight = reservation.height;
            var overlap = false;
            $.each(line, function(slotNo, slot) {
              var slot = line[slotNo];
              // with the curly change above, we can live with sharing
              // borders
              if (slot.from < newSlot.to && newSlot.from < slot.to) {
                overlap = true;
                return false;
              }
            });
            if (!overlap) {
              if (!reservation.curly && span.drawCurly) {
                // TODO: need to push up the boxes drawn so far
                // (rare glitch)
                // it would be prettier to track individual boxes (and not
                // rows) but the cases when it matters are rare, and not
                // worth the bother so far
                reservation.height += Configuration.visual.curlyHeight;
              }
              line.push(newSlot);
              return reservation.height;
            }
          }
          resHeight += newSlot.height + Configuration.visual.boxSpacing;
        }
        reservations.push({
          ranges: [newSlot],
          height: resHeight,
          curly: span.drawCurly,
        });
        return resHeight;
      }