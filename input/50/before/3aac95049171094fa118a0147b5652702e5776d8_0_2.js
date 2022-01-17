function iteratePaths(func) {
        $.each(filelist, function (index, value) {
            func(index, value);
        });
    }