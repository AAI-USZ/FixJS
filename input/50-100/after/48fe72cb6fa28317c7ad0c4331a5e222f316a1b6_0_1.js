function() {
      this._waitDialog.dismiss();
      this.get('_failureTimer').invalidate();

      SC.AlertPane.extend({
        layout: {top: 0, centerX: 0, width: 400, height: 100 }
      }).show(
        "Error posting to the journal",
        "Your post doesn't seem to have reached the journal. Please check your internet connection and try again.",
        "",
        "OK",
        this
      );

      Geniverse.blogPostController.restoreBlogPost();
    }