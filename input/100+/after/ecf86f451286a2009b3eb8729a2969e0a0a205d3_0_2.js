function(response) {
    var baseObject = View.getMain().getStack().getByURL(this.getBaseURL());
    if (baseObject) baseObject.invalidate();

    this.object.addEvent('hide:once', function() {
      View.getMain().getStack().prune();
    });

    // If the production is new and a cover photo is selected we need to upload it now.
    if (this.uploadFile) {
      if (!this.isEditMode)
        this.setSaveURL((this.getBaseURL() + '{uuid}').substitute(response.data));

      this.upload(this.uploadFile);
      this.uploadFile = null;
    }

    this.options.onSave.call(this, response.data);
  }