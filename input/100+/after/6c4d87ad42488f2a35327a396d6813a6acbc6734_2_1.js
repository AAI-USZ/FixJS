function(page_models, parent_element, level) {
        // fetch all instances                         // fetch_composite=false, sort=true
        var topics = dm4c.restc.get_topics(page_models[0].topic_type.uri, false, true).items
        var checkboxes = {}
        dm4c.render.field_label(page_models[0], parent_element)
        //
        for (var i = 0; i < topics.length; i++) {
            var checkbox = dm4c.render.checkbox(is_checked(topics[i]))
            parent_element.append(checkbox)
            parent_element.append(topics[i].value)
            parent_element.append("<br>")
            checkboxes[topics[i].id] = checkbox
        }
        //
        return function() {
            if (page_models[0].assoc_def.assoc_type_uri == "dm4.core.composition_def") {
                throw "CheckboxRendererError: the Checkbox Renderer can't be used with Composition Definition " +
                    "(but only with Aggregation Definition)"
            }
            //
            var values = []
            //
            for (var topic_id in checkboxes) {
                if (checkboxes[topic_id].get(0).checked) {
                    values.push(dm4c.REF_PREFIX + topic_id)
                }
            }
            return values
        }

        function is_checked(topic) {
            return js.includes(page_models, function(page_model) {
                return page_model.topic.id == topic.id
            })
        }
    }