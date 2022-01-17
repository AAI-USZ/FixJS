function(textRowNo, textRowDesc) { // row, from, to
          var textHighlight = svg.rect(highlightGroup,
              textRowDesc[1] - 2, textRowDesc[0].textY - sizes.fragment.height,
              textRowDesc[2] - textRowDesc[1] + 4, sizes.fragment.height + 4,
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
        }