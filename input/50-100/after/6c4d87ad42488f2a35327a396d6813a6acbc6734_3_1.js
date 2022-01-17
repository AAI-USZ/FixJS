function(page_models, parent_element, level) {
        var topic_renderer = dm4c.get_page_renderer("dm4.webclient.topic_renderer")
        for (var i = 0; i < page_models.length; i++) {
            topic_renderer.render_page_model(page_models[i], "page", level, parent_element)
        }
    }