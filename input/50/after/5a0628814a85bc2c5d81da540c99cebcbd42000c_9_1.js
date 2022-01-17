function(){
      Utils.debug("Saving session");
      $("#user-edit-modal").hide();
      $("#user-modal").show();
      this.model.saveAndEncryptUserToLocalStorage();

    }