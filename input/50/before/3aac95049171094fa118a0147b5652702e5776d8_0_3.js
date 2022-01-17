function hideAllPaths() {
        iteratePaths(function (index, value) {
            $(value.href).hide();
        });
    }