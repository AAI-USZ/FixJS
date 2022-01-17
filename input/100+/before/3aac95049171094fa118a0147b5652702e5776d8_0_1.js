function showPath(index) {
        var old_file_link = $("a[href=" + filelist[current_index].href + "]"),
            new_file_link = $("a[href=" + filelist[index].href + "]"),
            old_file = $(filelist[current_index].href),
            new_file = $(filelist[index].href);
        old_file.hide();
        old_file_link.css('font-weight', 'normal');
        new_file.show();
        new_file_link.css('font-weight', 'bold');
        current_index = index;
        window.scrollTo(0, new_file.offset().top);
    }