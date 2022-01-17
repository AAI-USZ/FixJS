function() {
      this.setPosition(this.locationModel.get('lat'), this.locationModel.get('lng'));
      var feedbackList = this.locationModel.get('feedback');
      if (!feedbackList || feedbackList.length === 0) {
        this.setPov(0, 0, 1);
      } else {
        this.setPov(feedbackList[0].heading, feedbackList[0].pitch, feedbackList[0].zoom);
      }
    }