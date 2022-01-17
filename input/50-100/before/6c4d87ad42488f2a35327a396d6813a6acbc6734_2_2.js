function checked(topic) {
            return js.includes(page_models, function(page_model) {
                return page_model.topic.id == topic.id
            })
        }