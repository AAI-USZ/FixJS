function () {
          //#region Visual manipulation
          //the spinner button should only affect the LoadMoreConversationsDiv
          var target = document.getElementById('loadMoreConversations');
          $(target).removeClass("readable");
          $(target).addClass("unreadable");
          spinnerAddConvs.spin(target);
          //#endregion
      
          //update the cumulativeSkip (supporting the use case where we use LoadMoreConversations multiple times)
          cummulativeSkip = cummulativeSkip + defaultNrOfConversationsToDisplay;
          
          //#region Prepare parameters
          var options = this.gatherFilterOptions();
          //#endregion

          //add these "old" conversations to the end
          var selfConversationsView = this;
          $.ajax({
             url: "Messages/ConversationsList",
             data: options,
             traditional: true,
             success: function (data) {
                spinnerAddConvs.stop();
                $(target).removeClass("unreadable");
                $(target).addClass("readable");

                $.each(data, function () {
                   var conv = new Conversation({
                      From: $(this).attr("From"),
                      ConvID: $(this).attr("ConvID"),
                      TimeReceived: $(this).attr("TimeReceived"),
                      Text: $(this).attr("Text"),
                      Read: $(this).attr("Read"),
                      To: $(this).attr('To'),
                      Starred:$(this).attr('Starred')
                   });
                   selfConversationsView.addConversationBasicEffect(conv, false);
                });
                if (data.length === 0 || data.length < defaultNrOfConversationsToDisplay) {
                   $(target).hide('slow');
                }
             }
          }
       );
       }