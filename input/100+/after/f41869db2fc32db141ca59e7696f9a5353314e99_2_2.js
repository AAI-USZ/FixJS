function () {
                    initInlineTest("test1.html", 1);
                    
                    var newText = "\n/* jasmine was here */",
                        hostEditor,
                        inlineEditor,
                        promise;
                    
                    runs(function () {
                        hostEditor = EditorManager.getCurrentFullEditor();
                        inlineEditor = hostEditor.getInlineWidgets()[0].editors[0];
                        
                        // verify inline is open
                        expect(hostEditor.getInlineWidgets().length).toBe(1);
                        
                        // insert text at the inline editor's cursor position
                        inlineEditor._codeMirror.replaceRange(newText, inlineEditor.getCursorPos());
                        
                        // verify isDirty flag
                        expect(inlineEditor.document.isDirty).toBe(true);
                        
                        // close the main editor / working set entry for the inline's file
                        promise = testWindow.executeCommand(Commands.FILE_CLOSE, {file: inlineEditor.document.file});
                        
                        // synchronously click the don't save button,
                        // asynchronously wait for the dialog to close and the Dialog's
                        // promise to resolve. 
                        SpecRunnerUtils.clickDialogButton(Dialogs.DIALOG_BTN_DONTSAVE);
                    });

                    // Wait on the command's promise also since the command performs
                    // asynchronous tasks after the Dialog is resolved. If the command
                    // could complete synchronously, this wait would be unnecessary.
                    runs(function () {
                        waitsForDone(promise);
                    });
                    
                    runs(function () {
                        // verify inline is closed
                        expect(hostEditor.getInlineWidgets().length).toBe(0);
                    });
                }