function(){
      Utils.debug("Saving user");
      $("#user-edit-modal").hide();
      $("#user-modal").show();
      
      this.model.set("email", $(this.el).find(".email").val());
      this.model.set("researchInterest", $(this.el).find(".researchInterest").val());
      this.model.set("affiliation", $(this.el).find(".affiliation").val());
      this.model.set("description", $(this.el).find(".description").val());
      this.model.set("gravatar", $(this.el).find(".gravatar").val());

      window.app.get("authentication").saveAndEncryptUserToLocalStorage();
      window.appView.renderEditableUserViews();
      window.appView.renderReadonlyUserViews();
      window.app.get("authentication").get("userPrivate").get("activities").unshift(
          new Activity({
            verb : "modified",
            directobject : "their profile",
            indirectobject : "",
            context : "via Offline App",
            user: window.app.get("authentication").get("userPublic")
          }));
    }