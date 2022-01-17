function saveSelection(containerEl) {

    var charIndex = 0, start = 0, end = 0, foundStart = false, stop = {};

    var sel = rangy.getSelection(), range;



    function traverseTextNodes(node, range) {

        if (node.nodeType == 3) {

            if (!foundStart && node == range.startContainer) {

                start = charIndex + range.startOffset;

                foundStart = true;

            }

            if (foundStart && node == range.endContainer) {

                end = charIndex + range.endOffset;

                throw stop;

            }

            charIndex += node.length;

        } else {

            for (var i = 0, len = node.childNodes.length; i < len; ++i) {

                traverseTextNodes(node.childNodes[i], range);

            }

        }

    }

    

    if (sel.rangeCount) {

        try {

            traverseTextNodes(containerEl, sel.getRangeAt(0));

        } catch (ex) {

            if (ex != stop) {

                throw ex;

            }

        }

    }



    return {

        start: start,

        end: end

    };

}