function checkIfIDropFolder(file, callback) {
    // Chrome/Mac and IE10/Win8 ignores directory in dataTrasfer.files

    if (
        // for example, Safari supports dnd but not FileReader
        !window['FileReader'] ||
        // FileReader doesn't work in Opera 12.00, it always returns error
        (window['opera'] && window['opera'].version() === '12.00')
    ) {
        // sorry, can't check
        callback(null);

    } else {
        try {
            var reader = new FileReader();
            reader.onerror = function() {
                // Chrome (Linux/Win), Firefox (Linux/Mac), Opera 12.01 (Linux/Mac/Win)
                callback(true);
            };
            reader.onloadstart = reader.onprogress = function() {
                // abort immediately, this is regular file
                this.abort();
                callback(false);
            };
            reader.readAsDataURL(file);
        } catch(e) {
            // Firefox 13.0.1/Win throws exception if I drop folder
            callback(true);
        }
    }
}