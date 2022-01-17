function restoreSelection(containerEl, savedSel) {

    var charIndex = 0, range = rangy.createRange(), foundStart = false, stop = {};

    range.collapseToPoint(containerEl, 0);

    

    function traverseTextNodes(node) {

        if (node.nodeType == 3) {

            var nextCharIndex = charIndex + node.length;

            if (!foundStart && savedSel.start >= charIndex && savedSel.start <= nextCharIndex) {

                range.setStart(node, savedSel.start - charIndex);

                foundStart = true;

            }

            if (foundStart && savedSel.end >= charIndex && savedSel.end <= nextCharIndex) {

                range.setEnd(node, savedSel.end - charIndex);

                throw stop;

            }

            charIndex = nextCharIndex;

        } else {

            for (var i = 0, len = node.childNodes.length; i < len; ++i) {

                traverseTextNodes(node.childNodes[i]);

            }

        }

    }

    

    try {

        traverseTextNodes(containerEl);

    } catch (ex) {

        if (ex == stop) {

            rangy.getSelection().setSingleRange(range);

        } else {

            throw ex;

        }

    }

}