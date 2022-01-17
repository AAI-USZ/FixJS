function(post) {
    var isotope = this.$el.data('isotope')
    _.defer(_.bind(function(){ isotope && this.$el.isotope("insert", this.createPostView(post).render().$el) }, this))
  }