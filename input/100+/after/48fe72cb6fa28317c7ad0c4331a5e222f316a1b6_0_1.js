function() {
      var title = Geniverse.blogPostController.get('title');
      var content = Geniverse.blogPostController.get('content');
      var tags = this._get_blog_tags();
      if (!this._checkURL(content)) {
        return;
      }

      this.closePanel();

      this._postToWPBlog(title, content, tags);

      this._showWaitDialog();

      this._failureTimer = SC.Timer.schedule({
			  target: this,
			  action: '_showFailureMessage',
			  interval: 10000,
			  repeats: NO
		  });

    }