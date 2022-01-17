function () {
          //the spinner button should only affect the LoadMoreConversationsDiv
          var target = document.getElementById('loadMoreConversations');
          $(target).removeClass("readable");
          $(target).addClass("unreadable");
          spinnerAddConvs.spin(target);
          var selectedTags = [];
          if (this.filters.tagFilteringEnabled) {
             selectedTags = this.filters.tagsForFiltering;
          }
          var showFavorites = this.filters.starredFilteringEnabled;
          var workingPointsNumbers = this.selectedWorkingPoints;
          //var workingPoints = checkedWorkingPoints.checkedPhoneNumbers;
          if (workingPoints !== null) {
             workingPointsNumbers = workingPoints;
             this.selectedWorkingPoints = workingPoints;
          }
                var startDate, endDate;
          if (this.filters.dateFilteringEnabled) {
             startDate = this.filters.startDate;
             endDate = this.filters.endDate;
          }

          var onlyUnreadConvs = this.filters.unreadFilteringEnabled;

          var top = defaultNrOfConversationsToDisplay;
          var skip = cummulativeSkip;
          cummulativeSkip = cummulativeSkip + defaultNrOfConversationsToDisplay;

          //add these "old" conversations to the end
          var self = this;
          $.ajax({
             url: "Messages/ConversationsList",
             data: {
                "showAll": true,
                "showFavourites": showFavorites,
                "tags": selectedTags,
                "workingPointsNumbers": workingPointsNumbers,
                "startDate": startDate,
                "endDate": endDate,
                "onlyUnread": onlyUnreadConvs,
                "skip": skip,
                "top": top
             },
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
                   self.addConversationBasicEffect(conv, false);
                });
                if (data.length === 0 || data.length < defaultNrOfConversationsToDisplay) {
                   $(target).hide('slow');
                }
             }
          }
       );
       }