function(){
   loginAs({id : -1, name: "alice", avatar : {small : "http://avatar.com/photo.jpg"}});

    Diaspora.I18n.loadLocale({stream : {
      'like' : "Like",
      'unlike' : "Unlike",
      'public' : "Public",
      'limited' : "Limted"
    }})

    var posts = $.parseJSON(spec.readFixture("stream_json"));

    this.post = new app.models.Post(posts[0]);
    this.view = new app.views.Feedback({model: this.post});
  }