function(cssStyle) {

                    // Sometimes cssStyle will be undefined/null
                    // if that is the case, we just return it
                    if (!cssStyle) {
                        return cssStyle;
                    }

                    // We first need to filter out all the comments
                    // since we also need to catch expr/*XSS*/ession
                    var regex = /\/\*.+?\*\//g;
                    cssStyle = cssStyle.replace(regex, '');

                    // If we encounter an expression, we remove the complete CSS style
                    regex = /expression\(/g;
                    if (cssStyle.search(regex) !== -1) {
                        cssStyle = '';
                    }
                    return cssStyle
                }