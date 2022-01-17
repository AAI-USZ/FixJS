function do_add() {
                // extend page model
                var topic = dm4c.empty_topic(topic_type.uri)
                var assoc_def      = page_models[0].assoc_def
                var field_uri      = page_models[0].uri
                var toplevel_topic = page_models[0].toplevel_topic
                var page_model = topic_renderer.create_page_model(topic, assoc_def, field_uri, toplevel_topic, "form")
                page_models.push(page_model)
                // render page model
                topic_renderer.render_page_model(page_model, "form", level, add_button_div, true)  // incremental=true
            }