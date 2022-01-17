function () {
                    initInlineTest("test1.html", 1);
                    
                    var newText = "\n/* jasmine was here */",
                        hostEditor,
                        inlineEditor;
                    
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
                        testWindow.executeCommand(Commands.FILE_CLOSE, {file: inlineEditor.document.file});
                        SpecRunnerUtils.clickDialogButton(Dialogs.DIALOG_BTN_DONTSAVE);
                    });
                    // clickDialogButton() inserts a wait automatically, so must end runs() block here
                    
                    runs(function () {
                        // verify inline is closed
                        expect(hostEditor.getInlineWidgets().length).toBe(0);
                    });
                }