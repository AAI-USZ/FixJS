function iterateFiles(func) {
        $.each(filelist, function (index, value) {
            func(index, value);
        });
    }