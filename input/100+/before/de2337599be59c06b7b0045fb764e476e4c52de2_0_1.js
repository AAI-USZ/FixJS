function(node) {
          var i, _ref2;
          if (node.sons.length > 0) {
            for (i = 0, _ref2 = node.sons.length - 1; 0 <= _ref2 ? i <= _ref2 : i >= _ref2; 0 <= _ref2 ? i++ : i--) {
              child = node.sons[i];
              if (!possibleSon[node.line.lineType](child.line.lineType)) {
                return alert("ERROR: invalid line " + child.line.lineID + "\n (hierarchic issue of a " + child.line.lineType + "-" + child.line.lineDepthAbs + ")");
              }
              if (nodeType(child.line.lineType) === "T") {
                if (node.line.lineDepthAbs + 1 !== child.line.lineDepthAbs) {
                  return alert("ERROR: invalid line " + child.line.lineID + "\n (indentation issue of a " + child.line.lineType + "-" + child.line.lineDepthAbs + ")");
                }
                recVerif(child);
              } else if (nodeType(child.line.lineType) === "L") {
                if (node.line.lineDepthAbs !== child.line.lineDepthAbs) {
                  return alert("ERROR: invalid line " + child.line.lineID + "\n (indentation issue of a " + child.line.lineType + "-" + child.line.lineDepthAbs + ")");
                }
              }
            }
          }
        }