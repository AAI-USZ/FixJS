function(text, style) {
          var l = text.length;
          if (wrapAt >= outPos && wrapAt < outPos + l) {
            if (wrapAt > outPos) {
              span_(text.slice(0, wrapAt - outPos), style);
              // See comment at the definition of spanAffectsWrapping
              if (wrapWBR) html.push("<wbr>");
            }
            html.push(open);
            span_(text.slice(wrapAt - outPos), style);
            html.push("</span>");
            wrapAt--;
            outPos += l;
          } else {
            outPos += l;
            span_(text, style);
            // Output empty wrapper when at end of line
            if (outPos == wrapAt && outPos == len) html.push(open + "</span>");
            // Stop outputting HTML when gone sufficiently far beyond measure
            else if (outPos > wrapAt + 10 && /\s/.test(text)) span = function(){};
          }
        }