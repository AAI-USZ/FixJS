function(_super) {

      __extends(AutoTest, _super);

      function AutoTest() {
        AutoTest.__super__.constructor.apply(this, arguments);
      }

      /* ------------------------------------------------------------------------
      # Checks whether the lines are well structured or not
      # Some suggestions of what could be checked out:
      #    <> each elt of lines corresponds to a DIV ------------------ (OK)
      #    <> each DIV has a matching elt in lines -------------------- (OK)
      #    <> type and depth are coherent ----------------------------- (OK)
      #    <> linePrev and LineNext are linked to the correct DIV ----- (OK)
      #    <> hierarchy of lines and indentation are okay ------------- (OK)
      #    <> a DIV contains a sequence of SPAN ended by a BR --------- (OK)
      #    <> two successive SPAN can't have the same class ----------- (OK)
      #    <> empty SPAN are really empty (<span></span>) ------------- (huh?)
      #    <> a note must  have at least one line
      */

      AutoTest.prototype.checkLines = function(CNEditor) {
        var child, children, currentLine, depth, element, i, id, lastClass, myAncestor, newNode, nextLine, node, nodeType, objDiv, possibleSon, prevLine, recVerif, root, rootLine, type, _ref;
        console.log('Detecting incoherences...');
        possibleSon = {
          "Th": function(name) {
            return name === "Lh" || name === "Th" || name === "To" || name === "Tu";
          },
          "Tu": function(name) {
            return name === "Lu" || name === "To" || name === "Tu";
          },
          "To": function(name) {
            return name === "Lo" || name === "To" || name === "Tu";
          },
          "Lh": function(name) {
            return false;
          },
          "Lu": function(name) {
            return false;
          },
          "Lo": function(name) {
            return false;
          },
          "root": function(name) {
            return true;
          }
        };
        nodeType = function(name) {
          if (name === "Lh" || name === "Lu" || name === "Lo") {
            return "L";
          } else if (name === "Th" || name === "Tu" || name === "To") {
            return "T";
          } else {
            return "ERR";
          }
        };
        id = function(line) {
          if (line === null) {
            return -1;
          } else {
            return parseInt(line.lineID.split("_")[1], 10);
          }
        };
        rootLine = {
          lineType: "root",
          lineID: "CNID_0",
          lineNext: CNEditor._lines["CNID_1"],
          linePrev: null,
          lineDepthAbs: 0
        };
        node = function(line, sons) {
          return {
            line: line,
            sons: sons
          };
        };
        root = new node(rootLine, []);
        myAncestor = [root];
        prevLine = null;
        currentLine = rootLine;
        nextLine = rootLine.lineNext;
        while (nextLine !== null) {
          type = nodeType(nextLine.lineType);
          depth = nextLine.lineDepthAbs;
          if (!((id(prevLine) + 2 === (_ref = id(currentLine) + 1) && _ref === id(nextLine)))) {
            return alert("ERROR: invalid line " + nextLine.lineID + "\n (" + nextLine.lineType + "-" + nextLine.lineDepthAbs + " has wrong identifier)");
          }
          element = CNEditor.editorBody$.children("#" + nextLine.lineID);
          if (element === null) {
            return alert("ERROR: invalid line " + nextLine.lineID + "\n (" + nextLine.lineType + "-" + nextLine.lineDepthAbs + " has no matching DIV)");
          }
          children = element.children();
          if (children === null || children.length < 2) {
            return alert("ERROR: invalid line " + nextLine.lineID + "\n (" + nextLine.lineType + "-" + nextLine.lineDepthAbs + " content is too short)");
          }
          lastClass = void 0;
          i = 0;
          while (i < children.length - 1) {
            child = children.get(i);
            if (child.nodeName === 'SPAN') {
              if ($(child).attr('class') != null) {
                if (lastClass === $(child).attr('class')) {
                  return alert("ERROR: invalid line " + nextLine.lineID + "\n (" + nextLine.lineType + "-" + nextLine.lineDepthAbs + " two consecutive SPAN with same class " + lastClass + ")");
                } else {
                  lastClass = $(child).attr('class');
                }
              }
            } else if (child.nodeName === 'A' || child.nodeName === 'IMG') {
              lastClass = void 0;
            } else {
              return alert("ERROR: invalid line " + nextLine.lineID + "\n (" + nextLine.lineType + "-" + nextLine.lineDepthAbs + " invalid label " + child.nodeName + ")");
            }
            i++;
          }
          child = children.get(children.length - 1);
          if (child.nodeName !== 'BR') {
            return alert("ERROR: invalid line " + nextLine.lineID + "\n (" + nextLine.lineType + "-" + nextLine.lineDepthAbs + " must end with BR)");
          }
          newNode = new node(nextLine, []);
          if (type === "T") {
            if (depth > myAncestor.length) {
              return alert("ERROR: invalid line " + nextLine.lineID + "\n (" + nextLine.lineType + "-" + nextLine.lineDepthAbs + " indentation issue)");
            } else if (depth === myAncestor.length) {
              myAncestor.push(newNode);
            } else {
              myAncestor[depth] = newNode;
            }
            if (myAncestor[depth - 1] === null) {
              return alert("ERROR: invalid line " + nextLine.lineID);
            } else {
              myAncestor[depth - 1].sons.push(newNode);
            }
          } else if (type === "L") {
            if (depth >= myAncestor.length) {
              return alert("ERROR: invalid line " + nextLine.lineID + "\n (" + nextLine.lineType + "-" + nextLine.lineDepthAbs + " indentation issue)");
            } else {
              myAncestor[depth + 1] = null;
            }
            if (myAncestor[depth] === null) {
              return alert("ERROR: invalid line " + nextLine.lineID);
            } else {
              myAncestor[depth].sons.push(newNode);
            }
          }
          prevLine = currentLine;
          currentLine = nextLine;
          nextLine = currentLine.lineNext;
        }
        objDiv = CNEditor.editorBody$.children("div");
        objDiv.each(function() {
          var myId;
          if ($(this).attr('id') != null) {
            myId = $(this).attr('id');
            if (/CNID_[0-9]+/.test(myId)) {
              if (!(CNEditor._lines[myId] != null)) {
                return alert("uh oh... missing line " + myId);
              }
            }
          }
        });
        recVerif = function(node) {
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
        };
        return recVerif(root);
      };

      return AutoTest;

    }