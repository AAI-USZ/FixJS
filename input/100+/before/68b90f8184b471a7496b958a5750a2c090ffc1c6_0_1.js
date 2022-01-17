function(topic, assoc_def, field_uri, toplevel_topic, setting) {
            var topic_type = dm4c.get_topic_type(topic.type_uri)   // ### TODO: real Topics would allow topic.get_type()
            if (!dm4c.get_view_config(topic_type, setting, assoc_def)) {
                return
            }
            if (topic_type.is_simple()) {
                return new FieldModel(topic, assoc_def, field_uri, toplevel_topic)
            } else {
                var page_model = new PageModel(topic, assoc_def, field_uri, toplevel_topic)
                for (var i = 0, assoc_def; assoc_def = topic_type.assoc_defs[i]; i++) {
                    var child_topic_type = dm4c.get_topic_type(assoc_def.part_topic_type_uri)
                    var child_field_uri = field_uri + dm4c.COMPOSITE_PATH_SEPARATOR + assoc_def.uri
                    var cardinality_uri = assoc_def.part_cardinality_uri
                    if (cardinality_uri == "dm4.core.one") {
                        var child_topic = topic.composite[assoc_def.uri] || dm4c.empty_topic(child_topic_type.uri)
                        var child_model = this.create_page_model(child_topic, assoc_def, child_field_uri,
                            toplevel_topic, setting)
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
                        var child_model = []
                        for (var j = 0, child_topic; child_topic = child_topics[j]; j++) {
                            var child_field = this.create_page_model(child_topic, assoc_def, child_field_uri,
                                toplevel_topic, setting)
                            child_model.push(child_field)
                        }
                    } else {
                        throw "TopicRendererError: \"" + cardinality_uri + "\" is an unexpected cardinality URI"
                    }
                    if (child_model) {
                        page_model.add_child(assoc_def.uri, child_model)
                    }
                }
                return page_model;
            }
        }