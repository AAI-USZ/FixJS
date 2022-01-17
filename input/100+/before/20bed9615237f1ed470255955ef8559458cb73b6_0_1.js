function(editor, data){

                alert("Exec'ing: " + tag);

                var format = {
                    element: tag
                };
                var style = new CKEDITOR.style(format);
                style.apply(editor.document);
            }