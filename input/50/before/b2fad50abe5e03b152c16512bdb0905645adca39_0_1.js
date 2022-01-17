function() {
        if ($(self).data('previous')) {
          self.selectItem($(self).data('previous'), {blurring: true})
        }
      }