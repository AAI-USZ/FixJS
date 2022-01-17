function() {
      var list = this.calendars;
      var store = this.app.store('Calendar');
      var key;
      var html = '';

      for (key in store.cached) {
        html += template.item.render(
          store.cached[key]
        );
      }

      list.innerHTML = html;
    }