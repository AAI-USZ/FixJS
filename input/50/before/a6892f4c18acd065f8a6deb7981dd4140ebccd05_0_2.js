function () 
    {
      var temp = Mustache.render(twitterTemplate, this.twitterData);
      this.$el.html(temp);

      window.App.twitterView = this;

    }