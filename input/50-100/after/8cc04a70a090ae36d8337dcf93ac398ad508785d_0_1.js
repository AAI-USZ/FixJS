function (ev) {
      console.assert(self.statusToSetOnCancel);
      console.assert(self.isEditingStatus);

      returnToShowingStatus();
      setTimeout(function () {
          $('#head-col2-row1').text(self.statusToSetOnCancel);
          self.isEditingStatus = false;
        }, 600);

      ev.stopPropagation();
      return false;
    }