function(fragmentNo, fragment) {
            var span = fragment.span;
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
            
            fragment.group = svg.group(chunk.group, {
              'class': 'span',
            });

            var fragmentHeight = 0;

            if (!y) y = -sizes.texts.height - Configuration.visual.curlyHeight;
            var x = (fragment.curly.from + fragment.curly.to) / 2;

            // XXX is it maybe sizes.texts?
            var yy = y + sizes.fragments.y;
            var hh = sizes.fragments.height;
            var ww = fragment.width;
            var xx = x - ww / 2;

            // text margin fine-tuning
            yy += boxTextMargin.y;
            hh -= 2*boxTextMargin.y;
            xx += boxTextMargin.x;
            ww -= 2*boxTextMargin.x;
            var rectClass = 'span_' + (span.cue || span.type) + ' span_default'; // TODO XXX first part unneeded I think; remove

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
              fragmentHeight = Math.max(bh + 2 * markedSpanSize, fragmentHeight);
            }
            if (span.shadowClass) {
              shadowRect = svg.rect(fragment.group,
                  bx - rectShadowSize, by - rectShadowSize,
                  bw + 2 * rectShadowSize, bh + 2 * rectShadowSize, {
                  'class': 'shadow_' + span.shadowClass,
                  filter: 'url(#Gaussian_Blur)',
                  rx: rectShadowRounding,
                  ry: rectShadowRounding,
              });
              chunkFrom = Math.min(bx - rectShadowSize, chunkFrom);
              chunkTo = Math.max(bx + bw + rectShadowSize, chunkTo);
              fragmentHeight = Math.max(bh + 2 * rectShadowSize, fragmentHeight);
            }
            fragment.rect = svg.rect(fragment.group,
                bx, by, bw, bh, {

                'class': rectClass,
                fill: bgColor,
                stroke: borderColor,
                rx: Configuration.visual.margin.x,
                ry: Configuration.visual.margin.y,
                'data-span-id': span.id,
                'strokeDashArray': span.attributeMerge.dashArray,
              });
            fragment.right = bx + bw; // TODO put it somewhere nicer?
            if (!(span.shadowClass || span.marked)) {
              chunkFrom = Math.min(bx, chunkFrom);
              chunkTo = Math.max(bx + bw, chunkTo);
              fragmentHeight = Math.max(bh, fragmentHeight);
            }

            fragment.rectBox = { x: bx, y: by - span.floor, width: bw, height: bh };
            fragment.height = span.floor + hh + 3 * Configuration.visual.margin.y + Configuration.visual.curlyHeight + Configuration.visual.arcSpacing;
            var dlineIndex = fragment.lineIndex * 2;
            if (!fragmentHeights[dlineIndex] || fragmentHeights[dlineIndex] < fragment.height) {
              fragmentHeights[dlineIndex] = fragment.height;
            }
            $(fragment.rect).attr('y', yy - Configuration.visual.margin.y - span.floor);
            if (shadowRect) {
              $(shadowRect).attr('y', yy - rectShadowSize - Configuration.visual.margin.y - span.floor);
            }
            if (markedRect) {
              $(markedRect).attr('y', yy - markedSpanSize - Configuration.visual.margin.y - span.floor);
            }
            if (span.attributeMerge.box === "crossed") {
              svg.path(fragment.group, svg.createPath().
                  move(xx, yy - Configuration.visual.margin.y - span.floor).
                  line(xx + fragment.width,
                    yy + hh + Configuration.visual.margin.y - span.floor),
                  { 'class': 'boxcross' });
              svg.path(fragment.group, svg.createPath().
                  move(xx + fragment.width, yy - Configuration.visual.margin.y - span.floor).
                  line(xx, yy + hh + Configuration.visual.margin.y - span.floor),
                  { 'class': 'boxcross' });
            }
            var fragmentText = svg.text(fragment.group, x, y - span.floor, data.spanAnnTexts[fragment.glyphedLabelText], { fill: fgColor });

            // Make curlies to show the fragment
            if (fragment.drawCurly) {
              var curlyColor = 'grey';
              if (coloredCurlies) {
                var spanDesc = spanTypes[span.type];
                var bgColor = ((spanDesc && spanDesc.bgColor) ||
                               (spanTypes.SPAN_DEFAULT &&
                                spanTypes.SPAN_DEFAULT.fgColor) || 
                               '#000000');
                curlyColor = Util.adjustColorLightness(bgColor, -0.6);
              }

              var bottom = yy + hh + Configuration.visual.margin.y - span.floor + 1;
              svg.path(fragment.group, svg.createPath()
                  .move(fragment.curly.from, bottom + Configuration.visual.curlyHeight)
                  .curveC(fragment.curly.from, bottom,
                    x, bottom + Configuration.visual.curlyHeight,
                    x, bottom)
                  .curveC(x, bottom + Configuration.visual.curlyHeight,
                    fragment.curly.to, bottom,
                    fragment.curly.to, bottom + Configuration.visual.curlyHeight),
                {
                  'class': 'curly',
                  'stroke': curlyColor,
                });
              chunkFrom = Math.min(fragment.curly.from, chunkFrom);
              chunkTo = Math.max(fragment.curly.to, chunkTo);
              fragmentHeight = Math.max(Configuration.visual.curlyHeight, fragmentHeight);
            }

            if (fragment == span.headFragment) {
              // find the gap to fit the backwards arcs, but only on
              // head fragment - other fragments don't have arcs
              $.each(span.incoming, function(arcId, arc) {
                var leftSpan = data.spans[arc.origin];
                var origin = leftSpan.headFragment.chunk;
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
                var target = leftSpan.headFragment.chunk;
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
            }
            fragmentHeight += span.floor || Configuration.visual.curlyHeight;
            if (fragmentHeight > chunkHeight) chunkHeight = fragmentHeight;
            hasAnnotations = true;
          }