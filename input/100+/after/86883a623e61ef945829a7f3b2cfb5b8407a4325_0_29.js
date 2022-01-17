function(text, style) {
          var l = text.length;
          if (wrapAt >= outPos && wrapAt < outPos + l) {
            if (wrapAt > outPos) {
              span_(text.slice(0, wrapAt - outPos), style);
              // See comment at the definition of spanAffectsWrapping
              if (wrapWBR) html.push("<wbr>");
            }
            html.push(open);
            var cut = wrapAt - outPos;
            span_(opera ? text.slice(cut, cut + 1) : text.slice(cut), style);
            html.push("</span>");
            if (opera) span_(text.slice(cut + 1), style);
            wrapAt--;
            outPos += l;
          } else {
            outPos += l;
            span_(text, style);
            // Output empty wrapper when at end of line
            if (outPos == wrapAt && outPos == len) html.push(open + (gecko ? "&#x200b;" : " ") + "</span>");
            // Stop outputting HTML when gone sufficiently far beyond measure
            else if (outPos > wrapAt + 10 && /\s/.test(text)) span = function(){};
          }
        }