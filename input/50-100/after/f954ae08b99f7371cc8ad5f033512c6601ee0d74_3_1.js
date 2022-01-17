function() {
        if (debug) console.log('onload');
        if (palette) palette.remove();

        main.append('<table id="dropArea"><tr><td id="folders"></td><td id="files"></td><td id="images"></td></tr></table>');
        folders = $('#folders');
        files = $('#files');
        images = $('#images');
        
        _Files.refreshFolders();
        _Files.refreshFiles();
        _Files.refreshImages();

    //	_Files.resize();
    }