function(sel) {
          var divs, i, k, myDivs, node, range, _ref;
          myDivs = [];
          if (sel.rangeCount === 0) return;
          for (i = 0, _ref = sel.rangeCount - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
            range = sel.getRangeAt(i);
            divs = range.getNodes([1], function(element) {
              return element.tagName === 'DIV';
            });
            if (divs.length === 0) {
              if (range.commonAncestorContainer.tagName !== 'BODY') {
                node = range.commonAncestorContainer;
                while (node.tagName !== 'DIV') {
                  node = node.parentNode;
                }
                divs.push(node);
              }
            }
            k = 0;
            while (k < divs.length) {
              myDivs.push($(divs[k]));
              k++;
            }
          }
          return myDivs;
        }