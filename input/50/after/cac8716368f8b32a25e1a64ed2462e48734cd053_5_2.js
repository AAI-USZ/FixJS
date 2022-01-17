function () {
      if ($(this).attr('required')) {
        self.model.required.push($(this).attr('name'));
      }
    }