function () {
            if (myEditor) {
                myEditor.destroy();
                myEditor = null;
                $("#editor").remove();
                myDocument = null;
            }
        }