function() {
      Utils.debug("Saving the Corpus");
      var self = this;
      if(this.model.id == undefined){
        this.model.set("corpusname", window.app.get("authentication").get("userPrivate").get("username")
          +"-"+encodeURIComponent(this.model.get("title").replace(/ /g,"")) );
        this.model.get("couchConnection").corpusname = window.app.get("authentication").get("userPrivate").get("username")
          +"-"+encodeURIComponent(this.model.get("title").replace(/ /g,"")) ;
      }
      this.model.changeCorpus(this.model.get("corpusname"),function(){
        self.model.save(null, {
          success : function(model, response) {
            Utils.debug('Corpus save success');
            try{
              if(window.app.get("corpus").id != model.id){
                //add corpus to user
                this.model.set("titleAsUrl", encodeURIComponent(this.model.get("title")));
                window.app.get("authentication").get("userPrivate").get("corpuses").unshift(model.get("couchConnection"));
                window.appView.activityFeedView.model.get("activities").add(
                    new Activity({
                      verb : "added",
                      directobject : "a corpus",
                      indirectobject : "",
                      context : "via Offline App",
                      user: window.app.get("authentication").get("userPublic")
                    }));
                //create the first session and datalist for this corpus.
                var s = new Session(); //MUST be a new model, other wise it wont save in a new pouch.
                s.get("sessionFields").where({label: "user"})[0].set("value", auth.get("userPrivate").get("username") );
                s.get("sessionFields").where({label: "consultants"})[0].set("value", "AA");
                s.get("sessionFields").where({label: "goal"})[0].set("value", "To explore the app and try entering/importing data");
                s.get("sessionFields").where({label: "dateSEntered"})[0].set("value", new Date());
                s.get("sessionFields").where({label: "dateElicited"})[0].set("value", "A few months ago, probably on a Monday night.");
                s.set("corpusname", model.get("corpusname"));
                s.changeCorpus(model.get("corpusname"));
                model.get("sessions").add(s);
                app.set("currentSession", s);//TODO this will probably require the appView to reinitialize.
                window.app.get("authentication").get("userPrivate").get("mostRecentIds").sessionid = model.id;

                var dl = new DataList(); //MUST be a new model, other wise it wont save in a new pouch.
                dl.set({
                  "title" : "Default Data List",
                  "dateCreated" : (new Date()).toDateString(),
                  "description" : "This is the default data list for this corpus. " +
                    "Any new datum you create is added here. " +
                    "Data lists can be used to create handouts, prepare for sessions with consultants, " +
                    "export to LaTeX, or share with collaborators.",
                  "corpusname" : model.get("corpusname")
                });
                dl.changeCorpus(model.get("corpusname"));
                model.get("dataLists").add(dl);
                window.app.set("currentDataList", dl);
                window.app.get("authentication").get("userPrivate").get("mostRecentIds").datalistid = model.id;
                window.app.get("authentication").get("userPrivate").get("mostRecentIds").corpusid = model.id;
                window.app.set("corpus", model);
                window.app.storeCurrentDashboardIdsToLocalStorage(function(){
                  //force the app to reload with the new corpus as the main corpus, this is require dbecause otherwise we cannot garentee that the new models will end up in the right pouches and in the right views will let go of the old models. 
                  //another alternative would be to implement switchSession and switchDataList functions in the appView
                  window.location.redirect("/");
                });
              }
              window.app.set("corpus", model);
              window.app.get("authentication").get("userPrivate").get("mostRecentIds").corpusid = model.id;
            }catch(e){
              Utils.debug("Couldnt save the corpus somewhere"+e);
            }
            if(this.format == "modal"){
              $("#new-corpus-modal").modal("hide");
              window.app.router.showFullscreenCorpus();
              alert("The permissions and datum fields and session fields were copied from the previous corpus, please check your corpus settings to be sure they are what you want for this corpus.");
            }
          },
          error : function(e) {
            Alert('Corpus save error' + e);
            if(this.format == "modal"){
              $("#new-corpus-modal").modal("hide");
              window.app.router.showFullscreenCorpus();
              alert("The permissions and datum fields and session fields were copied from the previous corpus, please check your corpus settings to be sure they are what you want for this corpus.");
            }
          }
        });
      });
    }