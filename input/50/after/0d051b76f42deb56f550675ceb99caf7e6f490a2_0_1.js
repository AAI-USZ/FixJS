function(file_topic_id) {
        return this.request("POST", "/files/" + file_topic_id)
    }