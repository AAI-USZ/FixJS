function(topic) {
            var page_model = create_page_model(topic, "form")
            // trigger hook
            dm4c.trigger_plugin_hook("pre_render_form", topic, page_model)
            //
            render_page_model(page_model, "form")
            //
            return function() {
                dm4c.do_update_topic(topic_renderer.build_topic_model(page_model))
            }
        }