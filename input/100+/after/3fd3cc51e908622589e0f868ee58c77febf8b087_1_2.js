function(str, skip_redraw) {
        if (!str) {
            T.filtered_filelist = T.filelist;

        } else {
            T.filtered_filelist = [];
            var l = T.filelist.length;
            for (var i = 0; i < l; i++) {
                if (T.filelist[i].indexOf(str) > -1) T.filtered_filelist.push(T.filelist[i]);
            }
            T.filtered_filelist.push('');
        }
        _last_filter = '' + str;

        if(!skip_redraw) T.GRID.redraw();
    }