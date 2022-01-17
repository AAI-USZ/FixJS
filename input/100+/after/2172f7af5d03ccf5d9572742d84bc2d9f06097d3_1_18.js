function(chunkNo, chunk) {
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
          if (chunk.fragments.length) {
            var orderedIdx = [];
            for (var i=chunk.fragments.length-1; i>=0; i--) {
              orderedIdx.push(i);
            }

            // Mark entity nesting height/depth (number of
            // nested/nesting entities). To account for crossing
            // brackets in a (mostly) reasonable way, determine
            // depth/height separately in a left-to-right traversal
            // and a right-to-left traversal.
            orderedIdx.sort(lrChunkComp);              
            
            var openFragments = [];
            for(var i=0; i<orderedIdx.length; i++) {
              var current = chunk.fragments[orderedIdx[i]];
              current.nestingHeightLR = 0;
              current.nestingDepthLR = 0;
              var stillOpen = [];
              for(var o=0; o<openFragments.length; o++) {
                if(openFragments[o].to > current.from) {
                  stillOpen.push(openFragments[o]);
                  openFragments[o].nestingHeightLR++;
                }
              }
              openFragments = stillOpen;
              current.nestingDepthLR=openFragments.length;
              openFragments.push(current);
            }

            // re-sort for right-to-left traversal by end position
            orderedIdx.sort(rlChunkComp);

            openFragments = [];
            for(var i=0; i<orderedIdx.length; i++) {
              var current = chunk.fragments[orderedIdx[i]];
              current.nestingHeightRL = 0;
              current.nestingDepthRL = 0;
              var stillOpen = [];
              for(var o=0; o<openFragments.length; o++) {
                if(openFragments[o].from < current.to) {
                  stillOpen.push(openFragments[o]);
                  openFragments[o].nestingHeightRL++;
                }
              }
              openFragments = stillOpen;
              current.nestingDepthRL=openFragments.length;
              openFragments.push(current);
            }

            // the effective depth and height are the max of those
            // for the left-to-right and right-to-left traversals.
            for(var i=0; i<orderedIdx.length; i++) {
              var c = chunk.fragments[orderedIdx[i]];
              c.nestingHeight = c.nestingHeightLR > c.nestingHeightRL ? c.nestingHeightLR : c.nestingHeightRL;
              c.nestingDepth = c.nestingDepthLR > c.nestingDepthRL ? c.nestingDepthLR : c.nestingDepthRL;
            }

            // Re-order by nesting height and draw in order
            orderedIdx.sort(function(a,b) { return Util.cmp(chunk.fragments[b].nestingHeight, chunk.fragments[a].nestingHeight) });

            for(var i=0; i<chunk.fragments.length; i++) {
              var fragment=chunk.fragments[orderedIdx[i]];
              var spanDesc = spanTypes[fragment.span.type];
              var bgColor = ((spanDesc && spanDesc.bgColor) ||
                             (spanTypes.SPAN_DEFAULT && spanTypes.SPAN_DEFAULT.bgColor) ||
                             '#ffffff');

              // Tweak for nesting depth/height. Recognize just three
              // levels for now: normal, nested, and nesting, where
              // nested+nesting yields normal. (Currently testing
              // minor tweak: don't shrink for depth 1 as the nesting 
              // highlight will grow anyway [check nestingDepth > 1])
              var shrink = 0;
              if(fragment.nestingDepth > 1 && fragment.nestingHeight == 0) {
                  shrink = 1;
              } else if(fragment.nestingDepth == 0 && fragment.nestingHeight > 0) {
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
              fragment.highlightPos = {
                  x: chunk.textX + fragment.curly.from + xShrink, 
                  y: chunk.row.textY + sizes.texts.y + yShrink + yStartTweak,
                  w: fragment.curly.to - fragment.curly.from - 2*xShrink, 
                  h: sizes.texts.height - 2*yShrink - yStartTweak,
              };
              svg.rect(highlightGroup,
                  fragment.highlightPos.x, fragment.highlightPos.y,
                  fragment.highlightPos.w, fragment.highlightPos.h,
                  { fill: lightBgColor, //opacity:1,
                    rx: highlightRounding.x,
                    ry: highlightRounding.y,
                  });
            }
          }
        }