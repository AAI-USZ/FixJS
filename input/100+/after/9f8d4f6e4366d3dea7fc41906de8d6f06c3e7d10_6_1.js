function highlightPosition() {
    var ast, b, brackets, i, node, offset, parent, pos, r, ranges, s, span, _i, _j, _len, _len2, _len3, _ref, _ref2, _ref3, _ref4, _ref5;
    s = window.getSelection();
    if (s.rangeCount) {
      focusBox(s.focusNode);
      parent = getBox(s.focusNode);
      if ((_ref = s.getRangeAt(0)) != null ? _ref.collapsed : void 0) {
        if (!parent || (parent.getAttribute('LeisureOutput') != null)) return;
        if (parent.parentNode) {
          ast = getAst(parent);
          if (ast != null) {
            offset = (_ref2 = ast.leisureCodeOffset) != null ? _ref2 : 0;
            r = s.getRangeAt(0);
            r.setStart(parent, 0);
            pos = getRangeText(r).length;
            brackets = Leisure.bracket(ast.leisureBase, pos - offset);
            if (oldBrackets[0] !== parent || !oldBrackets[1].equals(brackets)) {
              oldBrackets = [parent, brackets];
              _ref3 = document.querySelectorAll("[LeisureBrackets]");
              for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
                node = _ref3[_i];
                unwrap(node);
              }
              _ref4 = parent.querySelectorAll(".partialApply");
              for (_j = 0, _len2 = _ref4.length; _j < _len2; _j++) {
                node = _ref4[_j];
                unwrap(node);
              }
              parent.normalize();
              markPartialApplies(parent);
              b = brackets;
              ranges = [];
              while (b !== Parse.Nil) {
                ranges.push(makeRange(parent, b.head().head() + offset, b.head().tail().head() + offset));
                b = b.tail();
              }
              for (i = 0, _len3 = ranges.length; i < _len3; i++) {
                r = ranges[i];
                span = document.createElement('span');
                span.setAttribute('LeisureBrackets', '');
                span.setAttribute('class', i === 0 ? 'LeisureFunc' : 'LeisureArg');
                wrapRange(r, span);
              }
              s.removeAllRanges();
              s.addRange(makeRange(parent, pos));
            }
          }
        }
      }
      if ((parent != null ? (_ref5 = parent.ast) != null ? _ref5.leisureName : void 0 : void 0) != null) {
        return update("sel-" + parent.ast.leisureName);
      }
    }
  }