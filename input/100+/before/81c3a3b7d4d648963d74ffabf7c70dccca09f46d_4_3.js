function($component) {
      var type = $component.data('type');
      this.componentListView.$el.hide();

      this.elementListView = new ElementListView({
        type: type
      });
      this.elementListView.bind('createElement', this.layoutView.createElement,
        this.layoutView);

      $('#sidebar').append(this.elementListView.render().$el);
      this.elementListView.centerButtons();
    }