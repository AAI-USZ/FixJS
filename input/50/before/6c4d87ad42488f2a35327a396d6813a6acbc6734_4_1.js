function(topic) {
            var page_model = create_page_model(topic, "viewable")
            // trigger hook
            dm4c.trigger_plugin_hook("pre_render_page", topic, page_model)
            //
            render_page_model(page_model, "page")
            //
            dm4c.render.associations(topic.id)
        }