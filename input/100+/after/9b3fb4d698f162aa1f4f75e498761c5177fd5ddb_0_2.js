function (workingPoints) {
          //#region  Reseting internal variables                    
          this._convViews = [];

          //reset the cummulative skip because we start with a "fresh" view
          cummulativeSkip = defaultNrOfConversationsToSkip;
          //#endregion

          //#region Visual manipulation
          var target = document.getElementById('scrollableconversations');
          $('#loadMoreConversations').hide();
          $('#conversations').html('');
          spinner.spin(target);
          //#endregion
                    
          //#region Prepare parameters
          var options = this.gatherFilterOptions();                  
          //#endregion

          this.convsList.fetch({
             data: options,
             traditional:true,
             success: function (data) {               
                spinner.stop();
             }
          });
       }