function(data){
        log(data);
        // it would be nicer to update only the changed item, but for now easily reload the whole dir  
        var folder = data.uri.substr(0, data.uri.lastIndexOf('/', data.uri.length-2)+1);
        if (folder === currentFolder) {
            loadFolder();            
        }
    }