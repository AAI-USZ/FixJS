function(response) {
    var baseURL = this.getBaseURL();
    var object = this.object;

    var stack = View.getMain().getStack();
    var baseObject = stack.getByURL(baseURL);
    stack.invalidate(baseObject);

    if (this.isEditMode) stack.invalidate(baseURL + response.data.uuid);

    // Current object should get removed after sliding it out
    object.addEvent('hide:once', function() {
      this.getStack().remove(this);
      if (baseObject)
        this.getStack().getCurrent().setBack(baseObject.getBackTemplate());
    });

    // If the production is new and a cover photo is selected we need to upload it now.
    if (this.uploadFile) {
      if (!this.isEditMode)
        this.setSaveURL((this.getBaseURL() + '{uuid}').substitute(response.data));

      this.upload(this.uploadFile).on({
        success: (function() {
          this.uploadFile = null;
        }).bind(this)
      });
    }

    this.onSave(response.data);
  }