f          // separate out possible numeric suffix from type
          var noNumArcType;
          var splitArcType;
          if (arc.type) {
            splitArcType = arc.type.match(/^(.*?)(\d*)$/);
            noNumArcType = splitArcType[1];
          }

          var originSpan = data.spans[arc.origin];
          var targetSpan = data.spans[arc.target];

          var leftToRight = originSpan.headFragment.lineIndex < targetSpan.headFragment.lineIndex;
          var left, right;
          if (leftToRight) {
            left = originSpan.headFragment;
            right = targetSpan.headFragment;
          } else {
            left = targetSpan.headFragment;
            right = originSpan.headFragment;
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
            if (fragmentHeights[i] > height) height = fragmentHeights[i];
          }
          height += Configuration.visual.arcSpacing;
          var leftSlantBound, rightSlantBound;
          for (var i = fromIndex2; i <= toIndex2; i++) {
            if (fragmentHeights[i] < height) fragmentHeights[i] = height;
          }

          // Adjust the height to align with pixels when rendered

          // TODO: on at least Chrome, this doesn't make a difference:
          // the lines come out pixel-width even without it. Check.
          height += 0.5

          var chunkReverse = false;
          var ufoCatcher = originSpan.headFragment.chunk.index == targetSpan.headFragment.chunk.index;
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
