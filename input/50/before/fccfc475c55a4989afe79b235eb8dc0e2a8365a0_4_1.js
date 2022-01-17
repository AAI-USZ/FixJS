function(e) {
                    e.stopPropagation();
                    
                    console.log(editor.getValue());
                    
                    _Files.updateTextFile(file, editor.getValue());
                   
                }