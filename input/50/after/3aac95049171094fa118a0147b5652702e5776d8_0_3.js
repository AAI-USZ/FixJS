function hideAllFiles() {
        iterateFiles(function (index, value) {
            $(value.href).hide();
        });
    }