function(element) {
            if (element instanceof jQuery && element[0]) {
                element = element[0];
            }
            // Check whether a MathJax formula is available
            var elementContent = $(element).html();
            if (elementContent && elementContent.indexOf('$$') !== -1) {
                // Check whether MathJax has already been loaded
                if (!window['MathJax'] || !MathJax.Hub) {
                    sakai_util.loadMathJax();
                }
                // Try to render the formula. This will fail if MathJax hasn't finished
                // loading yet. If that's the case, the system will retry after 200ms
                try {
                    MathJax.Hub.Queue(['Typeset', MathJax.Hub, element]);
                } catch (err) {
                    setTimeout(function() {
                        sakai_util.renderMath(element);
                    }, 200);
                }
            }
        }