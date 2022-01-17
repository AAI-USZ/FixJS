function(e, ui) {
        if (!markup.input.is(':focus') && $(self).data('previous')) {
          self.selectItem($(self).data('previous'), {blurring: true})
        }
      }