function(id, object) {
      var html = template.item.render(object);
      this.calendars.insertAdjacentHTML(
        'beforeend',
        html
      );
    }