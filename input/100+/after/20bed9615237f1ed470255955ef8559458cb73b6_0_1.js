function(editor, data){
                var selection = editor.getSelection(),
                ranges = selection.getRanges(0),
                range = ranges && ranges[0],
                enclosedNode = range && range.getEnclosedNode(),
                upperTag = tag.toUpperCase();

                console.warn("selection is: ", selection);
                console.warn("range is: ", range);
                console.warn("enclosed node is: ", enclosedNode);

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
                // WebKit and sometimes Firefox, apparently
                else if(range && (range.startContainer.$.nodeName == upperTag || range.startContainer.$.parentNode.nodeName == upperTag)) {
                    editor.execCommand('removeFormat');
                    return;
                }

                // Apply the button style
                var style = new CKEDITOR.style({ element: tag });
                style.apply(editor.document);
            }