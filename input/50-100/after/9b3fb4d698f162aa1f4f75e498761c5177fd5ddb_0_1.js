function () {
          // We keep track of the rendered state of the view
          this._rendered = true;

          var convEl = $("#conversations");
          convEl.html('');
          var selfConversationsView = this;
          this.convsList.each(function (conv) {
             selfConversationsView.addConversationBasicEffect(conv);
          });
       }