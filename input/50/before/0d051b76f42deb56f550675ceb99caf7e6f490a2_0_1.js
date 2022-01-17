function(file_topic_id) {
        return this.request("GET", "/files/" + file_topic_id)
    }