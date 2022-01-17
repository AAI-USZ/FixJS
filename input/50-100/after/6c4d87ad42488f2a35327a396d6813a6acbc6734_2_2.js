function() {
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