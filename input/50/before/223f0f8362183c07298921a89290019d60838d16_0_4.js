function(tally) {
      var view = new TallyView({model: tally});
      this.$("#tally-list").append(view.render().e1);
    }