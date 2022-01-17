function(editor, data){
                var selection = editor.getSelection(),
                ranges = selection.getRanges(0),
                range = ranges && ranges[0],
                enclosedNode = range && range.getEnclosedNode(),
                upperTag = tag.toUpperCase();

                if(enclosedNode) {
                    // Firefox
                    if(enclosedNode.$.nodeName == upperTag) {
                        editor.execCommand('removeFormat');
                        return;
                    }
                    else if(enclosedNode.$.childNodes.length && enclosedNode.$.childNodes[0].tagName == upperTag) {
                        editor.execCommand('removeFormat');
                        return;
                    }
                    // WebKit
                    else if(CKEDITOR.env.webkit && enclosedNode.$.nodeType == 3 && enclosedNode.$.parentNode && 
                            enclosedNode.$.parentNode.nodeName == upperTag) {
                        editor.execCommand('removeFormat');
                        return;
                    }
                }
                // WebKit
                else if(CKEDITOR.env.webkit && range && range.startContainer.$.parentNode.nodeName == upperTag) {
                    editor.execCommand('removeFormat');
                    return;
                }

                // Apply the button style
                var format = { element: tag };
                var style = new CKEDITOR.style(format);
                style.apply(editor.document);
            }