function(m) {
      var li = new TableView({ model: m });
      this.$el.append(li.render().el);
      this.addView(li);
      this._updateListHeader();
    }