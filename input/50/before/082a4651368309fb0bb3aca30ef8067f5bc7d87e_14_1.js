function all_plugins_loaded() {
            load_page_renderers()
            load_field_renderers()
            load_stylesheets()
            //
            config.post_load_plugins()
        }