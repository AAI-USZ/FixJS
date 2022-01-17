function createTestEditor(content, mode) {
            // create dummy Document for the Editor
            myDocument = SpecRunnerUtils.createMockDocument(content);
            
            // create Editor instance (containing a CodeMirror instance)
            $("body").append("<div id='editor'/>");
            myEditor = new Editor(myDocument, true, mode, $("#editor").get(0), {});
        }