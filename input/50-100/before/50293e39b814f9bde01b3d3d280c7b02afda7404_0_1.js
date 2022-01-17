function saveFile(force) {
        debug.info("saveFile:  force = "+force)
        console.log(editor.getValue());
        model.setFile(filepath,editor.session.doc.getValue(),force,null,null,handle409);
    }