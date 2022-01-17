function() {
    this.conversation = new app.models.Conversation(this.model.get("conversation"))
    this.latestPost = this.conversation.latest
    console.log(this.conversation)
  }