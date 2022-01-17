function () {
          this.filters = filterArea;
          this.workingpoints = workingPointsArea;
          _.bindAll(this,
             "render",
             "getConversations",
             "getAdditionalConversations",
             "addConversationWithEffect",
             "addConversationBasicEffect",
             "updateConversation",
             "newMessageReceived",
             "removeConversation",                        
             "filterConversations");
          this.convsList = new ConversationsList();
          this.convsList.bind("reset", this.render);
          this.convsList.bind("add", this.addConversationWithEffect, this);
          this.selectedWorkingPoints = [];
          // this.convsList.change("change", this.updatedConversation, this);
          this.convsList.bind("remove", this.removeConversation, this);
          //$("#conversations").selectable();
          // create an array of views to keep track of children
          this._convViews = [];
          //by default conversations are "new"
          this.addConversationAsNewElement = true;
       }