function(spanNo, span) {
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
          }