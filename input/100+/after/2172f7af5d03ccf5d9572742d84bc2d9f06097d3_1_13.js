function(arcId, arc) {
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
              }