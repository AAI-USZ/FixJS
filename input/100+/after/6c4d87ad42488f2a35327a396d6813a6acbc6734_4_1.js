function(topic, assoc_def, field_uri, toplevel_topic, render_mode) {
            var topic_type = dm4c.get_topic_type(topic.type_uri)   // ### TODO: real Topics would allow topic.get_type()
            if (topic_type.is_simple()) {
                //
                if (!dm4c.get_view_config(topic_type, render_setting(), assoc_def)) {
                    return
                }
                //
                return new PageModel(PageModel.SIMPLE, topic, assoc_def, field_uri, toplevel_topic)
            } else {
                var page_model = new PageModel(PageModel.COMPOSITE, topic, assoc_def, field_uri, toplevel_topic)
                for (var i = 0, assoc_def; assoc_def = topic_type.assoc_defs[i]; i++) {
                    var child_topic_type = dm4c.get_topic_type(assoc_def.part_topic_type_uri)
                    //
                    if (!dm4c.get_view_config(child_topic_type, render_setting(), assoc_def)) {
                        continue
                    }
                    //
                    var child_field_uri = field_uri + dm4c.COMPOSITE_PATH_SEPARATOR + assoc_def.uri
                    var cardinality_uri = assoc_def.part_cardinality_uri
                    if (cardinality_uri == "dm4.core.one") {
                        var child_topic = topic.composite[assoc_def.uri] || dm4c.empty_topic(child_topic_type.uri)
                        var child_model = this.create_page_model(child_topic, assoc_def, child_field_uri,
                            toplevel_topic, render_mode)
                        page_model.childs[assoc_def.uri] = child_model
                    } else if (cardinality_uri == "dm4.core.many") {
                        // ### TODO: server: don't send empty arrays
                        var child_topics = topic.composite[assoc_def.uri] || []
                        if (!js.is_array(child_topics)) {
                            throw "TopicRendererError: field \"" + assoc_def.uri + "\" is defined as multi-value but " +
                                "appears as single-value in " + JSON.stringify(topic)
                        }
                        if (child_topics.length == 0) {
                            child_topics.push(dm4c.empty_topic(child_topic_type.uri))
                        }
                        var child_model = new PageModel(PageModel.MULTI, child_topics[0], assoc_def, field_uri,
                            toplevel_topic)
                        for (var j = 0, child_topic; child_topic = child_topics[j]; j++) {
                            var child_field = this.create_page_model(child_topic, assoc_def, child_field_uri,
                                toplevel_topic, render_mode)
                            child_model.values.push(child_field)
                        }
                        page_model.childs[assoc_def.uri] = child_model
                    } else {
                        throw "TopicRendererError: \"" + cardinality_uri + "\" is an unexpected cardinality URI"
                    }
                }
                return page_model;
            }

            function render_setting() {
                switch (render_mode) {
                case "page":
                    return "viewable"
                case "form":
                    return "editable"
                default:
                    throw "TopicRendererError: \"" + render_mode + "\" is an invalid render mode"
                }
            }
        }