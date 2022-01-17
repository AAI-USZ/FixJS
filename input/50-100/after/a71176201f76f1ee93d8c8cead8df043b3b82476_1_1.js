function(data){
        log(data);
        // it would be nicer to update only the changed item, but for now easily reload the whole dir  
        var folder = dirname(data.uri);
        if (folder === currentFolder) {
            loadFolder();            
        }
    }