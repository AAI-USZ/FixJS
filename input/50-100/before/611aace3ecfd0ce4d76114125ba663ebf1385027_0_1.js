function(data){
        // it would be nicer to update only the changed item, but for now reloading the whole dir is easier  
        var folder = data.uri.substr(0, data.uri.lastIndexOf('/')+1);
        if (folder === currentFolder) {
            loadFolder();            
        }
    }