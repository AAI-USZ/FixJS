function(files) {
        dm4c.canvas.start_grid_positioning()
        //
        var dir_count = files.get_directory_count()
        for (var i = 0; i < dir_count; i++) {
            dm4c.get_plugin("de.deepamehta.files").create_file_topics(files.get_directory(i), i == 0)
        }
        for (var i = 0; i < files.get_file_count(); i++) {
            dm4c.get_plugin("de.deepamehta.files").create_file_topic(files.get_file(i), !dir_count && i == 0)
        }
        //
        dm4c.canvas.stop_grid_positioning()
    }