function(page_models, level, parent_element) {
        // fetch all instances                         // fetch_composite=false, sort=true
        var topics = dm4c.restc.get_topics(page_models[0].topic_type.uri, false, true).items
        //
        dm4c.render.field_label(page_models[0], parent_element)
        for (var i = 0; i < topics.length; i++) {
            var checkbox = dm4c.render.checkbox(checked(topics[i]))
            parent_element.append(checkbox)
            parent_element.append(topics[i].value)
            parent_element.append("<br>")
        }
        //
        return function() {
        }

        function checked(topic) {
            return js.includes(page_models, function(page_model) {
                return page_model.topic.id == topic.id
            })
        }
    }