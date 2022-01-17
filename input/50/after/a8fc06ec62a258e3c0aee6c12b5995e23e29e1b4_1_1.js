function(name){
    this.renderPage(function(){ return new app.pages.ConversationsIndex({title : name}) })
  }