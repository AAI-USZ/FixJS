function (button, file, element) {
        var headers = {};
        headers['X-StructrSessionToken'] = token;
        var text;
        
        $.ajax({
            url: viewRootUrl + file.name,
            async: true,
            //dataType: 'json',
            contentType: 'text/plain',
            headers: headers,
            success: function(data) {
                //console.log(data);
                text = data;
                
                var mode;
                
                if (file.name.endsWith('.css')) {
                    mode = 'text/css';
                } else if (file.name.endsWith('.js')) {
                    mode = 'text/javascript';
                } else {
                    mode = 'text/plain';
                }
                
                if (isDisabled(button)) return;
                var div = element.append('<div class="editor"></div>');
                if (debug) console.log(div);
                var contentBox = $('.editor', element);
                editor = CodeMirror(contentBox.get(0), {
                    value: unescapeTags(text),
                    mode:  mode,
                    lineNumbers: true
                //            ,
                //            onChange: function(cm, changes) {
                //                
                //                var element = $( '.' + entity.id + '_')[0];
                //                
                //                text1 = $(element).children('.content_').text();
                //                text2 = editor.getValue();
                //                
                //                if (!text1) text1 = '';
                //                if (!text2) text2 = '';
                //		
                //                if (debug) console.log('Element', element);
                //                if (debug) console.log(text1);
                //                if (debug) console.log(text2);
                //                
                //                if (text1 == text2) return;
                //                editorCursor = cm.getCursor();
                //                if (debug) console.log(editorCursor);
                //
                //                Command.patch(entity.id, text1, text2);
                //				
                //            }
                });

                editor.id = file.id;
                
                element.parent().children('.dialogBtn').append('<button id="saveFile"> Save </button>');
                $(element.parent().find('button#saveFile').first()).on('click', function(e) {
                    e.stopPropagation();
                    
                    console.log(editor.getValue());
                    
                    _Files.updateTextFile(file, editor.getValue());
                   
                });
                        
         

            }
        });
        
        

    }