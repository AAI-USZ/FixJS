function updateDisplay(changes, suppressCallback) {
      if (!scroller.clientWidth) {
        showingFrom = showingTo = displayOffset = 0;
        return;
      }
      // Compute the new visible window
      var visible = visibleLines();
      // Bail out if the visible area is already rendered and nothing changed.
      if (changes !== true && changes.length == 0 && visible.from > showingFrom && visible.to < showingTo) return;
      var from = Math.max(visible.from - 100, 0), to = Math.min(doc.size, visible.to + 100);
      if (showingFrom < from && from - showingFrom < 20) from = showingFrom;
      if (showingTo > to && showingTo - to < 20) to = Math.min(doc.size, showingTo);

      // Create a range of theoretically intact lines, and punch holes
      // in that using the change info.
      var intact = changes === true ? [] :
        computeIntact([{from: showingFrom, to: showingTo, domStart: 0}], changes);
      // Clip off the parts that won't be visible
      var intactLines = 0;
      for (var i = 0; i < intact.length; ++i) {
        var range = intact[i];
        if (range.from < from) {range.domStart += (from - range.from); range.from = from;}
        if (range.to > to) range.to = to;
        if (range.from >= range.to) intact.splice(i--, 1);
        else intactLines += range.to - range.from;
      }
      if (intactLines == to - from) return;
      intact.sort(function(a, b) {return a.domStart - b.domStart;});

      var th = textHeight(), gutterDisplay = gutter.style.display;
      lineDiv.style.display = "none";
      patchDisplay(from, to, intact);
      lineDiv.style.display = gutter.style.display = "";

      // Position the mover div to align with the lines it's supposed
      // to be showing (which will cover the visible display)
      var different = from != showingFrom || to != showingTo || lastSizeC != scroller.clientHeight + th;
      // This is just a bogus formula that detects when the editor is
      // resized or the font size changes.
      if (different) lastSizeC = scroller.clientHeight + th;
      showingFrom = from; showingTo = to;
      displayOffset = heightAtLine(doc, from);
      mover.style.top = (displayOffset * th) + "px";
      if (scroller.clientHeight)
        code.style.height = (doc.height * th + 2 * paddingTop()) + "px";

      // Since this is all rather error prone, it is honoured with the
      // only assertion in the whole file.
      if (lineDiv.childNodes.length != showingTo - showingFrom)
        throw new Error("BAD PATCH! " + JSON.stringify(intact) + " size=" + (showingTo - showingFrom) +
                        " nodes=" + lineDiv.childNodes.length);

      function checkHeights() {
        maxWidth = scroller.clientWidth;
        var curNode = lineDiv.firstChild, heightChanged = false;
        doc.iter(showingFrom, showingTo, function(line) {
          if (!line.hidden) {
            var height = Math.round(curNode.offsetHeight / th) || 1;
            if (line.height != height) {
              updateLineHeight(line, height);
              gutterDirty = heightChanged = true;
            }
          }
          curNode = curNode.nextSibling;
        });
        if (heightChanged)
          code.style.height = (doc.height * th + 2 * paddingTop()) + "px";
        return heightChanged;
      }

      if (options.lineWrapping) {
        checkHeights();
      } else {
        if (maxWidth == null) maxWidth = stringWidth(maxLine);
        if (maxWidth > scroller.clientWidth) {
          lineSpace.style.width = maxWidth + "px";
          // Needed to prevent odd wrapping/hiding of widgets placed in here.
          code.style.width = "";
          code.style.width = scroller.scrollWidth + "px";
        } else {
          lineSpace.style.width = code.style.width = "";
        }
      }

      gutter.style.display = gutterDisplay;
      if (different || gutterDirty) {
        // If the gutter grew in size, re-check heights. If those changed, re-draw gutter.
        updateGutter() && options.lineWrapping && checkHeights() && updateGutter();
      }
      updateSelection();
      if (!suppressCallback && options.onUpdate) options.onUpdate(instance);
      return true;
    }