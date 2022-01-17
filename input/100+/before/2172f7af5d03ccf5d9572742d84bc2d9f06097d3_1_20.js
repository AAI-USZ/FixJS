f
Util.profileEnd('before render');
Util.profileStart('render');
Util.profileStart('init');

        if (!sourceData && !data) { 
          dispatcher.post('doneRendering', [coll, doc, args]);
          return;
        }
        $svgDiv.show();
        if ((sourceData && (sourceData.document !== doc || sourceData.collection !== coll)) || drawing) {
          redraw = true;
          dispatcher.post('doneRendering', [coll, doc, args]);
          return;
        }
        redraw = false;
        drawing = true;

        if (sourceData) setData(sourceData);
        showMtime();

        // clear the SVG
        svg.clear(true);
        if (!data || data.length == 0) return;

        // establish the width according to the enclosing element
        canvasWidth = that.forceWidth || $svgDiv.width();

        var defs = addHeaderAndDefs();

        var backgroundGroup = svg.group({ 'class': 'background' });
        var glowGroup = svg.group({ 'class': 'glow' });
        highlightGroup = svg.group({ 'class': 'highlight' });
        var textGroup = svg.group({ 'class': 'text' });

Util.profileEnd('init');
Util.profileStart('measures');

        var sizes = getTextAndSpanTextMeasurements();
        data.sizes = sizes;

        adjustTowerAnnotationSizes();
        var maxTextWidth = 0;
        $.each(sizes.texts.widths, function(text, width) {
          if (width > maxTextWidth) maxTextWidth = width;
        });

Util.profileEnd('measures');
Util.profileStart('chunks');

        var currentX = Configuration.visual.margin.x + sentNumMargin + rowPadding;
        var rows = [];
        var spanHeights = [];
        var sentenceToggle = 0;
        var sentenceNumber = 0;
        var row = new Row(svg);
        row.sentence = ++sentenceNumber;
        row.backgroundIndex = sentenceToggle;
        row.index = 0;
        var rowIndex = 0;
        var reservations;
        var twoBarWidths; // HACK to avoid measuring space's width
        var openTextHighlights = {};
        var textMarkedRows = [];

        addArcTextMeasurements(sizes);
        $.each(data.chunks, function(chunkNo, chunk) {
          reservations = new Array();
          chunk.group = svg.group(row.group);
          chunk.highlightGroup = svg.group(chunk.group);

          var y = 0;
          var minArcDist;
          var hasLeftArcs, hasRightArcs, hasInternalArcs;
          var hasAnnotations;
          var chunkFrom = Infinity;
          var chunkTo = 0;
          var chunkHeight = 0;
          var spacing = 0;
          var spacingChunkId = null;
          var spacingRowBreak = 0;

          $.each(chunk.spans, function(spanNo, span) {
            var spanDesc = spanTypes[span.type];
            var bgColor = ((spanDesc && spanDesc.bgColor) || 
                           (spanTypes.SPAN_DEFAULT &&
                            spanTypes.SPAN_DEFAULT.bgColor) || '#ffffff');
            var fgColor = ((spanDesc && spanDesc.fgColor) || 
                           (spanTypes.SPAN_DEFAULT &&
                            spanTypes.SPAN_DEFAULT.fgColor) || '#000000');
            var borderColor = ((spanDesc && spanDesc.borderColor) || 
                               (spanTypes.SPAN_DEFAULT &&
                                spanTypes.SPAN_DEFAULT.borderColor) || '#000000');

            // special case: if the border 'color' value is 'darken',
            // then just darken the BG color a bit for the border.
            if (borderColor == 'darken') {
                borderColor = Util.adjustColorLightness(bgColor, -0.6);
            }
            
            span.group = svg.group(chunk.group, {
              'class': 'span',
            });

            var spanHeight = 0;

            if (!y) y = -sizes.texts.height - Configuration.visual.curlyHeight;
            var x = (span.curly.from + span.curly.to) / 2;

            // XXX is it maybe sizes.texts?
            var yy = y + sizes.spans.y;
            var hh = sizes.spans.height;
            var ww = span.width;
            var xx = x - ww / 2;

            // text margin fine-tuning
            yy += boxTextMargin.y;
            hh -= 2*boxTextMargin.y;
            xx += boxTextMargin.x;
            ww -= 2*boxTextMargin.x;
            var rectClass = 'span_' + (span.cue || span.type) + ' span_default';

            // attach e.g. "False_positive" into the type
            if (span.comment && span.comment.type) { rectClass += ' '+span.comment.type; }
            var bx = xx - Configuration.visual.margin.x - boxTextMargin.x;
            var by = yy - Configuration.visual.margin.y;
            var bw = ww + 2 * Configuration.visual.margin.x;
            var bh = hh + 2 * Configuration.visual.margin.y;

            if (roundCoordinates) {
              x  = (x|0)+0.5;
              bx = (bx|0)+0.5;              
            }

            var shadowRect;
            var markedRect;
            if (span.marked) {
              markedRect = svg.rect(chunk.highlightGroup,
                  bx - markedSpanSize, by - markedSpanSize,
                  bw + 2 * markedSpanSize, bh + 2 * markedSpanSize, {
 
                  // filter: 'url(#Gaussian_Blur)',
                  'class': "shadow_EditHighlight",
                  rx: markedSpanSize,
                  ry: markedSpanSize,
              });
              svg.other(markedRect, 'animate', {
                'data-type': span.marked,
                attributeName: 'fill',
                values: (span.marked == 'match'? highlightMatchSequence
                         : highlightSpanSequence),
                dur: highlightDuration,
                repeatCount: 'indefinite',
                begin: 'indefinite'
              });
              chunkFrom = Math.min(bx - markedSpanSize, chunkFrom);
              chunkTo = Math.max(bx + bw + markedSpanSize, chunkTo);
              spanHeight = Math.max(bh + 2 * markedSpanSize, spanHeight);
            }
            if (span.shadowClass) {
              shadowRect = svg.rect(span.group,
                  bx - rectShadowSize, by - rectShadowSize,
                  bw + 2 * rectShadowSize, bh + 2 * rectShadowSize, {
                  'class': 'shadow_' + span.shadowClass,
                  filter: 'url(#Gaussian_Blur)',
                  rx: rectShadowRounding,
                  ry: rectShadowRounding,
              });
              chunkFrom = Math.min(bx - rectShadowSize, chunkFrom);
              chunkTo = Math.max(bx + bw + rectShadowSize, chunkTo);
              spanHeight = Math.max(bh + 2 * rectShadowSize, spanHeight);
            }
            span.rect = svg.rect(span.group,
                bx, by, bw, bh, {

                'class': rectClass,
                fill: bgColor,
                stroke: borderColor,
                rx: Configuration.visual.margin.x,
                ry: Configuration.visual.margin.y,
                'data-span-id': span.id,
                'strokeDashArray': span.attributeMerge.dashArray,
              });
            span.right = bx + bw; // TODO put it somewhere nicer?
            if (!(span.shadowClass || span.marked)) {
              chunkFrom = Math.min(bx, chunkFrom);
              chunkTo = Math.max(bx + bw, chunkTo);
              spanHeight = Math.max(bh, spanHeight);
            }

            var yAdjust = placeReservation(span, bx, bw, bh, reservations);

            span.rectBox = { x: bx, y: by - yAdjust, width: bw, height: bh };
            // this is monotonous due to sort:
            span.height = yAdjust + hh + 3 * Configuration.visual.margin.y + Configuration.visual.curlyHeight + Configuration.visual.arcSpacing;
            spanHeights[span.lineIndex * 2] = span.height;
            $(span.rect).attr('y', yy - Configuration.visual.margin.y - yAdjust);
            if (shadowRect) {
              $(shadowRect).attr('y', yy - rectShadowSize - Configuration.visual.margin.y - yAdjust);
            }
            if (markedRect) {
              $(markedRect).attr('y', yy - markedSpanSize - Configuration.visual.margin.y - yAdjust);
            }
            if (span.attributeMerge.box === "crossed") {
              svg.path(span.group, svg.createPath().
                  move(xx, yy - Configuration.visual.margin.y - yAdjust).
                  line(xx + span.width,
                    yy + hh + Configuration.visual.margin.y - yAdjust),
                  { 'class': 'boxcross' });
              svg.path(span.group, svg.createPath().
                  move(xx + span.width, yy - Configuration.visual.margin.y - yAdjust).
                  line(xx, yy + hh + Configuration.visual.margin.y - yAdjust),
                  { 'class': 'boxcross' });
            }
            var spanText = svg.text(span.group, x, y - yAdjust, data.spanAnnTexts[span.glyphedLabelText], { fill: fgColor });

            // Make curlies to show the span
            if (span.drawCurly) {
              var curlyColor = 'grey';
              if (coloredCurlies) {
                var spanDesc = spanTypes[span.type];
                var bgColor = ((spanDesc && spanDesc.bgColor) ||
                               (spanTypes.SPAN_DEFAULT &&
                                spanTypes.SPAN_DEFAULT.fgColor) || 
                               '#000000');
                curlyColor = Util.adjustColorLightness(bgColor, -0.6);
              }

              var bottom = yy + hh + Configuration.visual.margin.y - yAdjust + 1;
              svg.path(span.group, svg.createPath()
                  .move(span.curly.from, bottom + Configuration.visual.curlyHeight)
                  .curveC(span.curly.from, bottom,
                    x, bottom + Configuration.visual.curlyHeight,
                    x, bottom)
                  .curveC(x, bottom + Configuration.visual.curlyHeight,
                    span.curly.to, bottom,
                    span.curly.to, bottom + Configuration.visual.curlyHeight),
                {
                  'class': 'curly',
                  'stroke': curlyColor,
                });
              chunkFrom = Math.min(span.curly.from, chunkFrom);
              chunkTo = Math.max(span.curly.to, chunkTo);
              spanHeight = Math.max(Configuration.visual.curlyHeight, spanHeight);
            }

            // find the gap to fit the backwards arcs
            $.each(span.incoming, function(arcId, arc) {
              var leftSpan = data.spans[arc.origin];
              var origin = leftSpan.chunk;
              var border;
              if (chunk.index == origin.index) {
                hasInternalArcs = true;
              }
              if (origin.row) {
                var labels = Util.getArcLabels(spanTypes, leftSpan.type, arc.type);
                if (!labels.length) labels = [arc.type];
                if (origin.row.index == rowIndex) {
                  // same row, but before this
                  border = origin.translation.x + leftSpan.right;
                } else {
                  border = Configuration.visual.margin.x + sentNumMargin + rowPadding;
                }
                var labelNo = Configuration.abbrevsOn ? labels.length - 1 : 0;
                var smallestLabelWidth = sizes.arcs.widths[labels[labelNo]] + 2 * minArcSlant;
                var gap = currentX + bx - border;
                var arcSpacing = smallestLabelWidth - gap;
                if (!hasLeftArcs || spacing < arcSpacing) {
                  spacing = arcSpacing;
                  spacingChunkId = origin.index + 1;
                }
                arcSpacing = smallestLabelWidth - bx;
                if (!hasLeftArcs || spacingRowBreak < arcSpacing) {
                  spacingRowBreak = arcSpacing;
                }
                hasLeftArcs = true;
              } else {
                hasRightArcs = true;
              }
            });
            $.each(span.outgoing, function(arcId, arc) {
              var leftSpan = data.spans[arc.target];
              var target = leftSpan.chunk;
              var border;
              if (target.row) {
                var labels = Util.getArcLabels(spanTypes, span.type, arc.type);
                if (!labels.length) labels = [arc.type];
                if (target.row.index == rowIndex) {
                  // same row, but before this
                  border = target.translation.x + leftSpan.right;
                } else {
                  border = Configuration.visual.margin.x + sentNumMargin + rowPadding;
                }
                var labelNo = Configuration.abbrevsOn ? labels.length - 1 : 0;
                var smallestLabelWidth = sizes.arcs.widths[labels[labelNo]] + 2 * minArcSlant;
                var gap = currentX + bx - border;
                var arcSpacing = smallestLabelWidth - gap;
                if (!hasLeftArcs || spacing < arcSpacing) {
                  spacing = arcSpacing;
                  spacingChunkId = target.index + 1;
                }
                arcSpacing = smallestLabelWidth - bx;
                if (!hasLeftArcs || spacingRowBreak < arcSpacing) {
                  spacingRowBreak = arcSpacing;
                }
                hasLeftArcs = true;
              } else {
                hasRightArcs = true;
              }
            });
            spanHeight += yAdjust || Configuration.visual.curlyHeight;
            if (spanHeight > chunkHeight) chunkHeight = spanHeight;
            hasAnnotations = true;
          }); // spans

          // positioning of the chunk
          chunk.right = chunkTo;
          var textWidth = sizes.texts.widths[chunk.text];
          chunkHeight += sizes.texts.height;
          var boxX = -Math.min(chunkFrom, 0);
          var boxWidth =
              Math.max(textWidth, chunkTo) -
              Math.min(0, chunkFrom);
          // if (hasLeftArcs) {
            // TODO change this with smallestLeftArc
            // var spacing = arcHorizontalSpacing - (currentX - lastArcBorder);
            // arc too small?
          if (spacing > 0) currentX += spacing;
          // }
          var rightBorderForArcs = hasRightArcs ? arcHorizontalSpacing : (hasInternalArcs ? arcSlant : 0);

          var lastX = currentX;
          var lastRow = row;

          if (chunk.sentence) {
            while (sentenceNumber < chunk.sentence) {
              sentenceNumber++;
              row.arcs = svg.group(row.group, { 'class': 'arcs' });
              rows.push(row);
              row = new Row(svg);
              sentenceToggle = 1 - sentenceToggle;
              row.backgroundIndex = sentenceToggle;
              row.index = ++rowIndex;
            }
            sentenceToggle = 1 - sentenceToggle;
          }

          if (chunk.sentence ||
              currentX + boxWidth + rightBorderForArcs >= canvasWidth - 2 * Configuration.visual.margin.x) {
            // the chunk does not fit
            row.arcs = svg.group(row.group, { 'class': 'arcs' });
            // TODO: related to issue #571
            // replace arcHorizontalSpacing with a calculated value
            currentX = Configuration.visual.margin.x + sentNumMargin + rowPadding +
                (hasLeftArcs ? arcHorizontalSpacing : (hasInternalArcs ? arcSlant : 0));
            if (hasLeftArcs) {
              var adjustedCurTextWidth = sizes.texts.widths[chunk.text] + arcHorizontalSpacing;
              if (adjustedCurTextWidth > maxTextWidth) {
                maxTextWidth = adjustedCurTextWidth;
              }
            }
            if (spacingRowBreak > 0) {
              currentX += spacingRowBreak;
              spacing = 0; // do not center intervening elements
            }

            // new row
            rows.push(row);

            svg.remove(chunk.group);
            row = new Row(svg);
            row.backgroundIndex = sentenceToggle;
            row.index = ++rowIndex;
            svg.add(row.group, chunk.group);
            chunk.group = row.group.lastElementChild;
            $(chunk.group).children("g[class='span']").
              each(function(index, element) {
                  chunk.spans[index].group = element;
              });
            $(chunk.group).find("rect[data-span-id]").
              each(function(index, element) {
                  chunk.spans[index].rect = element;
              });
          }

          // break the text highlights when the row breaks
          if (row.index !== lastRow.index) {
            $.each(openTextHighlights, function(textId, textDesc) {
              if (textDesc[3] != lastX) {
                var newDesc = [lastRow, textDesc[3], lastX + boxX, textDesc[4]];
                textMarkedRows.push(newDesc);
              }
              textDesc[3] = currentX;
            });
          }

          // open text highlights
          $.each(chunk.markedTextStart, function(textNo, textDesc) {
            textDesc[3] += currentX + boxX;
            openTextHighlights[textDesc[0]] = textDesc;
          });

          // close text highlights
          $.each(chunk.markedTextEnd, function(textNo, textDesc) {
            textDesc[3] += currentX + boxX;
            var startDesc = openTextHighlights[textDesc[0]];
            delete openTextHighlights[textDesc[0]];
            markedRow = [row, startDesc[3], textDesc[3], startDesc[4]];
            textMarkedRows.push(markedRow);
          });

          // XXX check this - is it used? should it be lastRow?
          if (hasAnnotations) row.hasAnnotations = true;

          if (chunk.sentence) {
            row.sentence = ++sentenceNumber;
          }

          if (spacing > 0) {
            // if we added a gap, center the intervening elements
            spacing /= 2;
            var firstChunkInRow = row.chunks[row.chunks.length - 1];
            if (spacingChunkId < firstChunkInRow.index) {
              spacingChunkId = firstChunkInRow.index + 1;
            }
            for (var chunkIndex = spacingChunkId; chunkIndex < chunk.index; chunkIndex++) {
              var movedChunk = data.chunks[chunkIndex];
              translate(movedChunk, movedChunk.translation.x + spacing, 0);
              movedChunk.textX += spacing;
            }
          }

          row.chunks.push(chunk);
          chunk.row = row;

          translate(chunk, currentX + boxX, 0);
          chunk.textX = currentX + boxX;

          var spaceWidth = 0;
          var spaceLen = chunk.nextSpace && chunk.nextSpace.length || 0;
          for (var i = 0; i < spaceLen; i++) spaceWidth += spaceWidths[chunk.nextSpace[i]] || 0;
          currentX += spaceWidth + boxWidth;
        }); // chunks

        // finish the last row
        row.arcs = svg.group(row.group, { 'class': 'arcs' });
        rows.push(row);

Util.profileEnd('chunks');
Util.profileStart('arcsPrep');

        var arrows = {};
        var arrow = makeArrow(defs, 'none');
        if (arrow) arrows['none'] = arrow;

        var len = spanHeights.length;
        for (var i = 0; i < len; i++) {
          if (!spanHeights[i] || spanHeights[i] < Configuration.visual.arcStartHeight) {
            spanHeights[i] = Configuration.visual.arcStartHeight;
          }
        }

        // find out how high the arcs have to go
        $.each(data.arcs, function(arcNo, arc) {
          arc.jumpHeight = 0;
          var fromSpan = data.spans[arc.origin];
          var toSpan = data.spans[arc.target];
          if (fromSpan.lineIndex > toSpan.lineIndex) {
            var tmp = fromSpan; fromSpan = toSpan; toSpan = tmp;
          }
          var from, to;
          if (fromSpan.chunk.index == toSpan.chunk.index) {
            from = fromSpan.lineIndex;
            to = toSpan.lineIndex;
          } else {
            from = fromSpan.lineIndex + 1;
            to = toSpan.lineIndex - 1;
          }
          for (var i = from; i <= to; i++) {
            if (arc.jumpHeight < spanHeights[i * 2]) arc.jumpHeight = spanHeights[i * 2];
          }
        });

        // sort the arcs
        data.arcs.sort(function(a, b) {
          // first write those that have less to jump over
          var tmp = a.jumpHeight - b.jumpHeight;
          if (tmp) return tmp < 0 ? -1 : 1;
          // if equal, then those that span less distance
          tmp = a.dist - b.dist;
          if (tmp) return tmp < 0 ? -1 : 1;
          // if equal, then those where heights of the targets are smaller
          tmp = data.spans[a.origin].height + data.spans[a.target].height -
            data.spans[b.origin].height - data.spans[b.target].height;
          if (tmp) return tmp < 0 ? -1 : 1;
          // if equal, then those with the lower origin
          tmp = data.spans[a.origin].height - data.spans[b.origin].height;
          if (tmp) return tmp < 0 ? -1 : 1;
          // if equal, they're just equal.
          return 0;
        });

        // draw the drag arc marker
        var arrowhead = svg.marker(defs, 'drag_arrow',
          5, 2.5, 5, 5, 'auto',
          {
            markerUnits: 'strokeWidth',
            'class': 'drag_fill',
          });
        svg.polyline(arrowhead, [[0, 0], [5, 2.5], [0, 5], [0.2, 2.5]]);

Util.profileEnd('arcsPrep');
Util.profileStart('arcs');

        // add the arcs
        $.each(data.arcs, function(arcNo, arc) {
          // separate out possible numeric suffix from type
          var noNumArcType;
          var splitArcType;
          if (arc.type) {
            splitArcType = arc.type.match(/^(.*?)(\d*)$/);
            noNumArcType = splitArcType[1];
          }

          var originSpan = data.spans[arc.origin];
          var targetSpan = data.spans[arc.target];

          var leftToRight = originSpan.lineIndex < targetSpan.lineIndex;
          var left, right;
          if (leftToRight) {
            left = originSpan;
            right = targetSpan;
          } else {
            left = targetSpan;
            right = originSpan;
          }

          var spanDesc = spanTypes[originSpan.type];
          // TODO: might make more sense to reformat this as dict instead
          // of searching through the list every type
          var arcDesc;
          if (spanDesc && spanDesc.arcs) {
            $.each(spanDesc.arcs, function(arcDescNo, arcDescIter) {
                if (arcDescIter.type == arc.type) {
                  arcDesc = arcDescIter;
                }
              });            
          }
          // fall back on unnumbered type if not found in full
          if (!arcDesc && noNumArcType && noNumArcType != arc.type &&
            spanDesc && spanDesc.arcs) {
            $.each(spanDesc.arcs, function(arcDescNo, arcDescIter) {
                if (arcDescIter.type == noNumArcType) {
                  arcDesc = arcDescIter;
                }
              });            
          }
          // fall back on relation types in case origin span type is
          // undefined
          // then final fallback to unnumbered relation
          // HACK: instead of falling back, extend (since
          // relation_types has more info!)
          $.extend(arcDesc, relationTypesHash[arc.type] || relationTypesHash[noNumArcType]);

          var color = ((arcDesc && arcDesc.color) || 
                       (spanTypes.ARC_DEFAULT && spanTypes.ARC_DEFAULT.color) ||
                       '#000000');
          var symmetric = arcDesc && arcDesc.properties && arcDesc.properties.symmetric;
          var hashlessColor = color.replace('#', '');
          var dashArray = arcDesc && arcDesc.dashArray;
          var arrowHead = ((arcDesc && arcDesc.arrowHead) ||
                           (spanTypes.ARC_DEFAULT && spanTypes.ARC_DEFAULT.arrowHead) ||
                           'triangle,5') + ',' + hashlessColor;

          var leftBox = rowBBox(left);
          var rightBox = rowBBox(right);
          var leftRow = left.chunk.row.index;
          var rightRow = right.chunk.row.index;

          if (!arrows[arrowHead]) {
            var arrow = makeArrow(defs, arrowHead);
            if (arrow) arrows[arrowHead] = arrow;
          }

          // find the next height
          var height = 0;

          var fromIndex2, toIndex2;
          if (left.chunk.index == right.chunk.index) {
            fromIndex2 = left.lineIndex * 2;
            toIndex2 = right.lineIndex * 2;
          } else {
            fromIndex2 = left.lineIndex * 2 + 1;
            toIndex2 = right.lineIndex * 2 - 1;
          }
          for (var i = fromIndex2; i <= toIndex2; i++) {
            if (spanHeights[i] > height) height = spanHeights[i];
          }
          height += Configuration.visual.arcSpacing;
          var leftSlantBound, rightSlantBound;
          for (var i = fromIndex2; i <= toIndex2; i++) {
            if (spanHeights[i] < height) spanHeights[i] = height;
          }

          // Adjust the height to align with pixels when rendered

          // TODO: on at least Chrome, this doesn't make a difference:
          // the lines come out pixel-width even without it. Check.
          height += 0.5

          var chunkReverse = false;
          var ufoCatcher = originSpan.chunk.index == targetSpan.chunk.index;
          if (ufoCatcher) {
            chunkReverse =
              leftBox.x + leftBox.width / 2 < rightBox.x + rightBox.width / 2;
          }
          var ufoCatcherMod = ufoCatcher ? chunkReverse ? -0.5 : 0.5 : 1;

          for (var rowIndex = leftRow; rowIndex <= rightRow; rowIndex++) {
            var row = rows[rowIndex];
            row.hasAnnotations = true;
            var arcGroup = svg.group(row.arcs, {
                'data-from': arc.origin,
                'data-to': arc.target
            });
            var from, to;
            
            if (rowIndex == leftRow) {
              from = leftBox.x + (chunkReverse ? 0 : leftBox.width);
            } else {
              from = sentNumMargin;
            }

            if (rowIndex == rightRow) {
              to = rightBox.x + (chunkReverse ? rightBox.width : 0);
            } else {
              to = canvasWidth - 2 * Configuration.visual.margin.y;
            }

            var originType = data.spans[arc.origin].type;
            var arcLabels = Util.getArcLabels(spanTypes, originType, arc.type);
            var labelText = Util.arcDisplayForm(spanTypes, originType, arc.type);
            // if (Configuration.abbrevsOn && !ufoCatcher && arcLabels) {
            if (Configuration.abbrevsOn && arcLabels) {
              var labelIdx = 1; // first abbreviation
              // strictly speaking 2*arcSlant would be needed to allow for
              // the full-width arcs to fit, but judged unabbreviated text
              // to be more important than the space for arcs.
              var maxLength = (to - from) - (arcSlant);
              while (sizes.arcs.widths[labelText] > maxLength &&
                     arcLabels[labelIdx]) {
                labelText = arcLabels[labelIdx];
                labelIdx++;
              }
            }

            var shadowGroup;
            if (arc.shadowClass || arc.marked) {
              shadowGroup = svg.group(arcGroup);
            }
            var options = {
              'fill': color,
              'data-arc-role': arc.type,
              'data-arc-origin': arc.origin,
              'data-arc-target': arc.target,
              'data-arc-id': arc.id,
              'data-arc-ed': arc.eventDescId,
            };

            // construct SVG text, showing possible trailing index
            // numbers (as in e.g. "Theme2") as subscripts
            var svgText;
            if (!splitArcType[2]) {
                // no subscript, simple string suffices
                svgText = labelText;
            } else {
                // Need to parse out possible numeric suffixes to avoid
                // duplicating number in label and its subscript
                var splitLabelText = labelText.match(/^(.*?)(\d*)$/);
                var noNumLabelText = splitLabelText[1];

                svgText = svg.createText();
                // TODO: to address issue #453, attaching options also
                // to spans, not only primary text. Make sure there
                // are no problems with this.
                svgText.span(noNumLabelText, options);
                var subscriptSettings = {
                  'dy': '0.3em', 
                  'font-size': '80%'
                };
                // alternate possibility
//                 var subscriptSettings = {
//                   'baseline-shift': 'sub',
//                   'font-size': '80%'
//                 };
                $.extend(subscriptSettings, options);
                svgText.span(splitArcType[2], subscriptSettings);
            }

            // guess at the correct baseline shift to get vertical centering.
            // (CSS dominant-baseline can't be used as not all SVG rendereds support it.)
            var baseline_shift = sizes.arcs.height / 4;
            var text = svg.text(arcGroup, (from + to) / 2, -height + baseline_shift,
                                svgText, options);

            var width = sizes.arcs.widths[labelText];
            var textBox = {
              x: (from + to - width) / 2,
              width: width,
              y: -height - sizes.arcs.height / 2,
              height: sizes.arcs.height,
            }
            if (arc.marked) {
              var markedRect = svg.rect(shadowGroup,
                  textBox.x - markedArcSize, textBox.y - markedArcSize,
                  textBox.width + 2 * markedArcSize, textBox.height + 2 * markedArcSize, {
                    // filter: 'url(#Gaussian_Blur)',
                    'class': "shadow_EditHighlight",
                    rx: markedArcSize,
                    ry: markedArcSize,
              });
              svg.other(markedRect, 'animate', {
                'data-type': arc.marked,
                attributeName: 'fill',
                values: (arc.marked == 'match' ? highlightMatchSequence
                         : highlightArcSequence),
                dur: highlightDuration,
                repeatCount: 'indefinite',
                begin: 'indefinite'
              });
            }
            if (arc.shadowClass) {
              svg.rect(shadowGroup,
                  textBox.x - arcLabelShadowSize, 
                  textBox.y - arcLabelShadowSize,
                  textBox.width  + 2 * arcLabelShadowSize, 
                  textBox.height + 2 * arcLabelShadowSize, {
                    'class': 'shadow_' + arc.shadowClass,
                    filter: 'url(#Gaussian_Blur)',
                    rx: arcLabelShadowRounding,
                    ry: arcLabelShadowRounding,
              });
            }
            var textStart = textBox.x;
            var textEnd = textBox.x + textBox.width;

            // adjust by margin for arc drawing
            textStart -= Configuration.visual.arcTextMargin;
            textEnd += Configuration.visual.arcTextMargin;

            if (from > to) {
              var tmp = textStart; textStart = textEnd; textEnd = tmp;
            }

            var path;

            if (roundCoordinates) {
              // don't ask
              height = (height|0)+0.5;
            }
            if (height > row.maxArcHeight) row.maxArcHeight = height;

            path = svg.createPath().move(textStart, -height);
            if (rowIndex == leftRow) {
              var cornerx = from + ufoCatcherMod * arcSlant;
              // for normal cases, should not be past textStart even if narrow
              if (!ufoCatcher && cornerx > textStart) { cornerx = textStart; }
              if (smoothArcCurves) {
                var controlx = ufoCatcher ? cornerx + 2*ufoCatcherMod*reverseArcControlx : smoothArcSteepness*from+(1-smoothArcSteepness)*cornerx;
                line = path.line(cornerx, -height).
                    curveQ(controlx, -height, from, leftBox.y + (leftToRight || arc.equiv ? leftBox.height / 2 : Configuration.visual.margin.y));
              } else {
                path.line(cornerx, -height).
                    line(from, leftBox.y + (leftToRight || arc.equiv ? leftBox.height / 2 : Configuration.visual.margin.y));
              }
            } else {
              path.line(from, -height);
            }
            var hashlessColor = color.replace('#', '');
            var myArrowHead   = ((arcDesc && arcDesc.arrowHead) || 
                                 (spanTypes.ARC_DEFAULT && spanTypes.ARC_DEFAULT.arrowHead));
            var arrowType = arrows[(leftToRight ?
                symmetric && myArrowHead || 'none' :
                myArrowHead || 'triangle,5') + ',' + hashlessColor];
            svg.path(arcGroup, path, {
              markerEnd: arrowType && ('url(#' + arrowType + ')'),
              style: 'stroke: ' + color,
              'strokeDashArray': dashArray,
            });
            if (arc.marked) {
              svg.path(shadowGroup, path, {
                  'class': 'shadow_EditHighlight_arc',
                  strokeWidth: markedArcStroke,
                  'strokeDashArray': dashArray,
              });
              svg.other(markedRect, 'animate', {
                'data-type': arc.marked,
                attributeName: 'fill',
                values: (arc.marked == 'match' ? highlightMatchSequence
                         : highlightArcSequence),
                dur: highlightDuration,
                repeatCount: 'indefinite',
                begin: 'indefinite'
              });
            }
            if (arc.shadowClass) {
              svg.path(shadowGroup, path, {
                  'class': 'shadow_' + arc.shadowClass,
                  strokeWidth: shadowStroke,
                  'strokeDashArray': dashArray,
              });
            }
            path = svg.createPath().move(textEnd, -height);
            if (rowIndex == rightRow) {
              // TODO: duplicates above in part, make funcs
              var cornerx  = to - ufoCatcherMod * arcSlant;
              // for normal cases, should not be past textEnd even if narrow
              if (!ufoCatcher && cornerx < textEnd) { cornerx = textEnd; }
              if (smoothArcCurves) {
                var controlx = ufoCatcher ? cornerx - 2*ufoCatcherMod*reverseArcControlx : smoothArcSteepness*to+(1-smoothArcSteepness)*cornerx;
                path.line(cornerx, -height).
                    curveQ(controlx, -height, to, rightBox.y + (leftToRight && !arc.equiv ? Configuration.visual.margin.y : rightBox.height / 2));
              } else {
                path.line(cornerx, -height).
                    line(to, rightBox.y + (leftToRight && !arc.equiv ? Configuration.visual.margin.y : rightBox.height / 2));
              }
            } else {
              path.line(to, -height);
            }
            var myArrowHead = ((arcDesc && arcDesc.arrowHead) ||
                               (spanTypes.ARC_DEFAULT && spanTypes.ARC_DEFAULT.arrowHead));
            var arrowType = arrows[(leftToRight ?
                myArrowHead || 'triangle,5' :
                symmetric && myArrowHead || 'none') + ',' + hashlessColor];
            svg.path(arcGroup, path, {
                markerEnd: arrowType && ('url(#' + arrowType + ')'),
                style: 'stroke: ' + color,
                'strokeDashArray': dashArray,
            });
            if (arc.marked) {
              svg.path(shadowGroup, path, {
                  'class': 'shadow_EditHighlight_arc',
                  strokeWidth: markedArcStroke,
                  'strokeDashArray': dashArray,
              });
            }
            if (shadowGroup) {
              svg.path(shadowGroup, path, {
                  'class': 'shadow_' + arc.shadowClass,
                  strokeWidth: shadowStroke,
                  'strokeDashArray': dashArray,
              });
            }
          } // arc rows
        }); // arcs

Util.profileEnd('arcs');
Util.profileStart('rows');

        // position the rows
        var y = Configuration.visual.margin.y;
        var sentNumGroup = svg.group({'class': 'sentnum'});
        var currentSent;
        $.each(rows, function(rowId, row) {
          $.each(row.chunks, function(chunkId, chunk) {
            $.each(chunk.spans, function(spanid, span) {
              if (row.maxSpanHeight < span.height) row.maxSpanHeight = span.height;
            });
          });
          if (row.sentence) {
            currentSent = row.sentence;
          }
          // SLOW (#724) and replaced with calculations:
          //
          // var rowBox = row.group.getBBox();
          // // Make it work on IE
          // rowBox = { x: rowBox.x, y: rowBox.y, height: rowBox.height, width: rowBox.width };
          // // Make it work on Firefox and Opera
          // if (rowBox.height == -Infinity) {
          //   rowBox = { x: 0, y: 0, height: 0, width: 0 };
          // }

          // XXX TODO HACK: find out where 5 and 1.5 come from!
          // This is the fix for #724, but the numbers are guessed.
          var rowBoxHeight = Math.max(row.maxArcHeight + 5, row.maxSpanHeight + 1.5); // XXX TODO HACK: why 5, 1.5?
          if (row.hasAnnotations) {
            // rowBox.height = -rowBox.y + rowSpacing;
            rowBoxHeight += rowSpacing + 1.5; // XXX TODO HACK: why 1.5?
          } else {
            rowBoxHeight -= 5; // XXX TODO HACK: why -5?
          }

          rowBoxHeight += rowPadding;
          var bgClass;
          if (data.markedSent[currentSent]) {
            // specifically highlighted
            bgClass = 'backgroundHighlight';
          } else if (Configuration.textBackgrounds == "striped") {
            // give every other sentence a different bg class
            bgClass = 'background'+ row.backgroundIndex;
          } else {
            // plain "standard" bg
            bgClass = 'background0';
          }
          svg.rect(backgroundGroup,
            0, y + sizes.texts.y + sizes.texts.height,
            canvasWidth, rowBoxHeight + sizes.texts.height + 1, {
            'class': bgClass,
          });
          y += rowBoxHeight;
          y += sizes.texts.height;
          row.textY = y - rowPadding;
          if (row.sentence) {
            var sentence_hash = new URLHash(coll, doc, { focus: [[ 'sent', row.sentence ]] } );
            var link = svg.link(sentNumGroup, sentence_hash.getHash());
            var text = svg.text(link, sentNumMargin - Configuration.visual.margin.x, y - rowPadding,
                '' + row.sentence, { 'data-sent': row.sentence });
            var sentComment = data.sentComment[row.sentence];
            if (sentComment) {
              var box = text.getBBox();
              svg.remove(text);
              // TODO: using rectShadowSize, but this shadow should
              // probably have its own setting for shadow size
              shadowRect = svg.rect(sentNumGroup,
                  box.x - rectShadowSize, box.y - rectShadowSize,
                  box.width + 2 * rectShadowSize, box.height + 2 * rectShadowSize, {

                  'class': 'shadow_' + sentComment.type,
                  filter: 'url(#Gaussian_Blur)',
                  rx: rectShadowRounding,
                  ry: rectShadowRounding,
                  'data-sent': row.sentence,
              });
              var text = svg.text(sentNumGroup, sentNumMargin - Configuration.visual.margin.x, y - rowPadding,
                  '' + row.sentence, { 'data-sent': row.sentence });
            }
          }
          
          var rowY = y - rowPadding;
          if (roundCoordinates) {
            rowY = rowY|0;
          }
          translate(row, 0, rowY);
          y += Configuration.visual.margin.y;
        });
        y += Configuration.visual.margin.y;

Util.profileEnd('rows');
Util.profileStart('chunkFinish');

        // chunk index sort functions for overlapping span drawing
        // algorithm; first for left-to-right pass, sorting primarily
        // by start offset, second for right-to-left pass by end
        // offset. Secondary sort by span length in both cases.
        var currentChunk;
        var lrChunkComp = function(a,b) { 
          var ac = currentChunk.spans[a];
          var bc = currentChunk.spans[b]
          var startDiff = Util.cmp(ac.from, bc.from);
          return startDiff != 0 ? startDiff : Util.cmp(bc.to-bc.from, ac.to-ac.from);
        }
        var rlChunkComp = function(a,b) { 
          var ac = currentChunk.spans[a];
          var bc = currentChunk.spans[b]
          var endDiff = Util.cmp(bc.to, ac.to);
          return endDiff != 0 ? endDiff : Util.cmp(bc.to-bc.from, ac.to-ac.from);
        }

        var sentenceText = null;
        $.each(data.chunks, function(chunkNo, chunk) {
          // context for sort
          currentChunk = chunk;

          // text rendering
          if (chunk.sentence) {
            if (sentenceText) {
              // svg.text(textGroup, sentenceText); // avoids jQuerySVG bug
              svg.text(textGroup, 0, 0, sentenceText);
            }
            sentenceText = null;
          }
          if (!sentenceText) {
            sentenceText = svg.createText();
          }
          var nextChunk = data.chunks[chunkNo + 1];
          var nextSpace = nextChunk ? nextChunk.space : '';
          sentenceText.span(chunk.text + nextSpace, {
            x: chunk.textX,
            y: chunk.row.textY,
            'data-chunk-id': chunk.index
          });

          // chunk backgrounds
          if (chunk.spans.length) {
            var orderedIdx = [];
            for (var i=chunk.spans.length-1; i>=0; i--) {
              orderedIdx.push(i);
            }

            // Mark entity nesting height/depth (number of
            // nested/nesting entities). To account for crossing
            // brackets in a (mostly) reasonable way, determine
            // depth/height separately in a left-to-right traversal
            // and a right-to-left traversal.
            orderedIdx.sort(lrChunkComp);              
            
            var openSpans = [];
            for(var i=0; i<orderedIdx.length; i++) {
              var current = chunk.spans[orderedIdx[i]];
              current.nestingHeightLR = 0;
              current.nestingDepthLR = 0;
              var stillOpen = [];
              for(var o=0; o<openSpans.length; o++) {
                if(openSpans[o].to > current.from) {
                  stillOpen.push(openSpans[o]);
                  openSpans[o].nestingHeightLR++;
                }
              }
              openSpans = stillOpen;
              current.nestingDepthLR=openSpans.length;
              openSpans.push(current);
            }

            // re-sort for right-to-left traversal by end position
            orderedIdx.sort(rlChunkComp);

            openSpans = [];
            for(var i=0; i<orderedIdx.length; i++) {
              var current = chunk.spans[orderedIdx[i]];
              current.nestingHeightRL = 0;
              current.nestingDepthRL = 0;
              var stillOpen = [];
              for(var o=0; o<openSpans.length; o++) {
                if(openSpans[o].from < current.to) {
                  stillOpen.push(openSpans[o]);
                  openSpans[o].nestingHeightRL++;
                }
              }
              openSpans = stillOpen;
              current.nestingDepthRL=openSpans.length;
              openSpans.push(current);
            }

            // the effective depth and height are the max of those
            // for the left-to-right and right-to-left traversals.
            for(var i=0; i<orderedIdx.length; i++) {
              var c = chunk.spans[orderedIdx[i]];
              c.nestingHeight = c.nestingHeightLR > c.nestingHeightRL ? c.nestingHeightLR : c.nestingHeightRL;
              c.nestingDepth = c.nestingDepthLR > c.nestingDepthRL ? c.nestingDepthLR : c.nestingDepthRL;
            }              

            // Re-order by nesting height and draw in order
            orderedIdx.sort(function(a,b) { return Util.cmp(chunk.spans[b].nestingHeight, chunk.spans[a].nestingHeight) });

            for(var i=0; i<chunk.spans.length; i++) {
              var span=chunk.spans[orderedIdx[i]];
              var spanDesc = spanTypes[span.type];
              var bgColor = ((spanDesc && spanDesc.bgColor) ||
                             (spanTypes.SPAN_DEFAULT && spanTypes.SPAN_DEFAULT.bgColor) ||
                             '#ffffff');

              // Tweak for nesting depth/height. Recognize just three
              // levels for now: normal, nested, and nesting, where
              // nested+nesting yields normal. (Currently testing
              // minor tweak: don't shrink for depth 1 as the nesting 
              // highlight will grow anyway [check nestingDepth > 1])
              var shrink = 0;
              if(span.nestingDepth > 1 && span.nestingHeight == 0) {
                  shrink = 1;
              } else if(span.nestingDepth == 0 && span.nestingHeight > 0) {
                  shrink = -1;
              }
              var yShrink = shrink * nestingAdjustYStepSize;
              var xShrink = shrink * nestingAdjustXStepSize;
              // bit lighter
              var lightBgColor = Util.adjustColorLightness(bgColor, 0.8);
              // tweak for Y start offset (and corresponding height
              // reduction): text rarely hits font max height, so this
              // tends to look better
              var yStartTweak = 1;
              // store to have same mouseover highlight without recalc              
              span.highlightPos = {
                  x: chunk.textX + span.curly.from + xShrink, 
                  y: chunk.row.textY + sizes.texts.y + yShrink + yStartTweak,
                  w: span.curly.to - span.curly.from - 2*xShrink, 
                  h: sizes.texts.height - 2*yShrink - yStartTweak,
              };
              svg.rect(highlightGroup,
                  span.highlightPos.x, span.highlightPos.y,
                  span.highlightPos.w, span.highlightPos.h,
                  { fill: lightBgColor, //opacity:1,
                    rx: highlightRounding.x,
                    ry: highlightRounding.y,
                  });
            }
          }
        });
        if (sentenceText) {
          // svg.text(textGroup, sentenceText); // avoids jQuerySVG bug
          svg.text(textGroup, 0, 0, sentenceText);
        }

        // draw the markedText
        $.each(textMarkedRows, function(textRowNo, textRowDesc) { // row, from, to
          var textHighlight = svg.rect(highlightGroup,
              textRowDesc[1] - 2, textRowDesc[0].textY - sizes.spans.height,
              textRowDesc[2] - textRowDesc[1] + 4, sizes.spans.height + 4,
              { fill: 'yellow' } // TODO: put into css file, as default - turn into class
          );
          // NOTE: changing highlightTextSequence here will give
          // different-colored highlights
          // TODO: entirely different settings for non-animations?
          var markedType = textRowDesc[3];
          svg.other(textHighlight, 'animate', {
            'data-type': markedType,
            attributeName: 'fill',
            values: (markedType == 'match' ? highlightMatchSequence
                     : highlightTextSequence),
            dur: highlightDuration,
            repeatCount: 'indefinite',
            begin: 'indefinite'
          });
        });


Util.profileEnd('chunkFinish');
Util.profileStart('finish');

        svg.path(sentNumGroup, svg.createPath().
          move(sentNumMargin, 0).
          line(sentNumMargin, y));

        // resize the SVG
        var width = maxTextWidth + sentNumMargin + 2 * Configuration.visual.margin.x + 1;
        if (width > canvasWidth) canvasWidth = width;

        $svg.width(canvasWidth);
        $svg.height(y);
        $svgDiv.height(y);

Util.profileEnd('finish');
Util.profileEnd('render');
Util.profileReport();


        drawing = false;
        if (redraw) {
          redraw = false;
          renderDataReal();
        }
        $svg.find('animate').each(function() {
          if (this.beginElement) { // protect against non-SMIL browsers
            this.beginElement();
          }
        });
        dispatcher.post('doneRendering', [coll, doc, args]);
      };
