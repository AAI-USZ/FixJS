function () {

    var self = this;

    this.getRegion().getElement().bind('click', function (e) {
      if (e.target.className === "close") {
        var tab = self.getObjectFromElement((self.getFromAnElement(e.target)));
        if (tab) {
          self.trigger('beforeClose');
          tab.close();
          self.trigger('close');
        }
        else {
          console.error('could not get tab object from click');
        }
      }
    });

    this.collection()._attachedEvents = true;
  }