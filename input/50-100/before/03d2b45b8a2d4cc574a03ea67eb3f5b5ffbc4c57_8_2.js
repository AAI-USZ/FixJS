function closeTestWindow() {
        // debug-only to see testWindow state before closing
        // waits(500);

        runs(function () {
            //we need to mark the documents as not dirty before we close
            //or the window will stay open prompting to save
            var openDocs = testWindow.brackets.test.DocumentManager.getAllOpenDocuments();
            openDocs.forEach(function resetDoc(doc) {
                if (doc.isDirty) {
                    //just refresh it back to it's current text. This will mark it
                    //clean to save
                    doc.refreshText(doc.getText(), doc.diskTimestamp);
                }
            });
            testWindow.close();
        });
    }