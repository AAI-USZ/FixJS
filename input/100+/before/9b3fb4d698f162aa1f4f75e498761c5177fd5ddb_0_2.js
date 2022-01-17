function (workingPoints) {
          var target = document.getElementById('scrollableconversations');
          $('#loadMoreConversations').hide();
          $('#conversations').html('');
          spinner.spin(target);
          var selectedTags =[];
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
          //reset the cummulative skip because we start with a "fresh" view
          cummulativeSkip = defaultNrOfConversationsToDisplay;

          var startDate, endDate;
          if (this.filters.dateFilteringEnabled) {
             startDate = this.filters.startDate;
             endDate = this.filters.endDate;
          }
          
          var onlyUnreadConvs = this.filters.unreadFilteringEnabled;

          var top = defaultNrOfConversationsToDisplay;
          var skip = 0;
          this.convsList.fetch({
             data: {
                "showAll": true,
                "showFavourites": showFavorites,
                "tags": selectedTags,
                "workingPointsNumbers": workingPointsNumbers,
                "startDate" : startDate,
                "endDate": endDate,
                "onlyUnread": onlyUnreadConvs,
                "skip": skip,
                "top": top
             },
             traditional: true,
             success: function (data) {               
                spinner.stop();
             }
          });
       }