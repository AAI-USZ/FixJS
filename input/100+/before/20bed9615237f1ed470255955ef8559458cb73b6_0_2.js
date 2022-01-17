function (editor, data) {
                    if(!$saveButton.length) {
                        $saveButton = $('.edited-section-ui.current .btn-save');
                    }
                    
                    editor.updateElement();
                    $saveButton.click();
                }